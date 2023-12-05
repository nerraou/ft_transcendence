import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   */
  interface DefaultUser {
    accessToken: string;
  }
}
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      accessToken: string | unknown;
    } & DefaultSession["user"];
  }
}
