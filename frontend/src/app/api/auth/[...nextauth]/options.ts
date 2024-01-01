import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/auth/sign-in";

        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });
        if (res.status == 200) {
          const user = await res.json();
          return user;
        } else {
          return null;
        }
      },
    }),

    CredentialsProvider({
      id: "google-auth",
      name: "google-auth",
      credentials: {},

      async authorize(oAuthParams) {
        if (!oAuthParams) {
          return null;
        }

        const res = await singUpWithGoogle(oAuthParams);

        if (res.ok) {
          const user = await res.json();

          return user;
        } else {
          return null;
        }
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

        if (res.ok) {
          const user = await res.json();

          return user;
        } else {
          return null;
        }
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
