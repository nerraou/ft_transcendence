import { useMutation } from "@tanstack/react-query";
import { SignInResponse, signIn } from "next-auth/react";

interface OAuthParamsProviderInput {
  provider: string;
  code: string;
}

interface OAuthParamsTOTPInput {
  provider: string;
  key: string;
  token: string;
}

export default function useSignUpWith42utation() {
  return useMutation<
    SignInResponse | undefined,
    any,
    OAuthParamsProviderInput | OAuthParamsTOTPInput
  >({
    retry: false,
    mutationFn(oAuthParams) {
      return signIn(oAuthParams.provider, {
        ...oAuthParams,
        redirect: false,
      });
    },
  });
}
