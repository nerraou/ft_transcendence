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
    async mutationFn(oAuthParams) {
      const response = await signIn(oAuthParams.provider, {
        ...oAuthParams,
        redirect: false,
      });

      if (!response?.ok) {
        throw new Error("server error", {
          cause: response,
        });
      }

      return response;
    },
  });
}
