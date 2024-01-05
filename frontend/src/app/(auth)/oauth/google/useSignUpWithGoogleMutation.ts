import { useMutation } from "@tanstack/react-query";
import { SignInResponse, signIn } from "next-auth/react";

interface OAuthParamsProviderInput {
  provider: string;
  code: string;
  scope: string;
  prompt: string;
}

interface OAuthParamsTOTPInput {
  provider: string;
  key: string;
  token: string;
}

export default function useSignUpWithGoogleMutation() {
  return useMutation<
    SignInResponse | undefined,
    any,
    OAuthParamsProviderInput | OAuthParamsTOTPInput
  >({
    retry: false,
    mutationFn(oAuthParams) {
      return signIn("google-auth", {
        ...oAuthParams,
        redirect: false,
      });
    },
  });
}
