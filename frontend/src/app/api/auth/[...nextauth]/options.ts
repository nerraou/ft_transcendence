import { NextAuthOptions } from "next-auth";
import CredentialsProvider, {
  CredentialInput,
} from "next-auth/providers/credentials";

function singUpWithGoogle(oAuthParams: Record<string, string>) {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/auth/google/authorize";

  const searchParams = new URLSearchParams();

  searchParams.append("code", oAuthParams.code);
  searchParams.append("prompt", oAuthParams.prompt);
  searchParams.append("scope", oAuthParams.scope);

  return fetch(url + "?" + searchParams.toString());
}

function singUpWith42(oAuthParams: Record<string, string>) {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/auth/42/authorize";

  const searchParams = new URLSearchParams();

  searchParams.append("code", oAuthParams.code);

  return fetch(url + "?" + searchParams.toString());
}

function oAuthTOTPVerify(body: Record<string, string>) {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/auth/totp/oauth/verify";

  return fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

interface Credentials extends Record<string, CredentialInput> {
  email: CredentialInput;
  password: CredentialInput;
  totp: CredentialInput;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider<Credentials>({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
        totp: {},
      },

      async authorize(credentials) {
        if (!credentials) {
          return;
        }

        const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/auth/sign-in";

        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
            token: credentials.token,
          }),
        });

        if (res.status == 200) {
          const data = await res.json();

          if (data.is2faEnabled) {
            throw new Error("2FA_ENABLED");
          }

          return data;
        } else {
          return null;
        }
      },
    }),

    CredentialsProvider<any>({
      id: "google-auth",
      name: "google-auth",
      credentials: {},

      async authorize(oAuthParams) {
        if (!oAuthParams) {
          return null;
        }

        const res = await singUpWithGoogle(oAuthParams);

        if (res.status == 200) {
          const data = await res.json();

          if (data.is2faEnabled) {
            throw new Error(
              JSON.stringify({
                code: "2FA_ENABLED",
                key: data.key,
              }),
            );
          }

          return data;
        }

        return null;
      },
    }),

    CredentialsProvider({
      id: "42-auth",
      name: "42-auth",
      credentials: {},

      async authorize(oAuthParams) {
        if (!oAuthParams) {
          return null;
        }

        const res = await singUpWith42(oAuthParams);

        if (res.status == 200) {
          const data = await res.json();

          if (data.is2faEnabled) {
            throw new Error(
              JSON.stringify({
                code: "2FA_ENABLED",
                key: data.key,
              }),
            );
          }

          return data;
        } else {
          return null;
        }
      },
    }),

    CredentialsProvider<any>({
      id: "oauth-totp-verify",
      name: "oauth-totp-verify",
      credentials: {},

      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const res = await oAuthTOTPVerify({
          key: credentials.key,
          token: credentials.token,
        });

        const data = await res.json();

        if (data.is2faEnabled) {
          throw new Error(
            JSON.stringify({
              code: "2FA_ENABLED",
              key: data.key,
            }),
          );
        }

        return data;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          accessToken: token.accessToken,
        },
      };
    },
  },
  pages: {
    signIn: "/sign-in",
  },

  session: {
    strategy: "jwt",
  },
};
