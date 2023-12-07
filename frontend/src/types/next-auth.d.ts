import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface DefaultUser {
    accessToken: string;
  }
}
declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string | unknown;
    } & DefaultSession["user"];
  }
}
