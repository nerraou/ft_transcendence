import { useMutation } from "@tanstack/react-query";
import { SignInResponse, signIn } from "next-auth/react";

interface OAuthParamsInput {
  code: string;
}

export default function useSignUpWith42utation() {
  return useMutation<SignInResponse | undefined, any, OAuthParamsInput>({
    retry: false,
    mutationFn(oAuthParams) {
      return signIn("42-auth", {
        ...oAuthParams,
        redirect: false,
      });
    },
  });
}
