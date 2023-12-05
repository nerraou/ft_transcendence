import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
          // Any object returned will be saved in `user` property of the JWT
          const user = await res.json();
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
        };
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
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
