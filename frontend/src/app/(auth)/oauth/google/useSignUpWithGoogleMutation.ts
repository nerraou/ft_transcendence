import { useMutation } from "@tanstack/react-query";
import { SignInResponse, signIn } from "next-auth/react";

interface OAuthParamsInput {
  code: string;
  scope: string;
  prompt: string;
}

export default function useSignUpWithGoogleMutation() {
  return useMutation<SignInResponse | undefined, any, OAuthParamsInput>({
    retry: false,
    mutationFn(oAuthParams) {
      return signIn("google-auth", {
        ...oAuthParams,
        redirect: false,
      });
    },
  });
}
