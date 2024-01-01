"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import Loading from "@app/loading";

import useSignUpWithGoogleMutation from "./useSignUpWithGoogleMutation";

function isString(data: any): data is string {
  return typeof data == "string";
}

export default function GoogleAuth() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const scope = searchParams.get("scope");
  const prompt = searchParams.get("prompt");

  const {
    mutate: signUpWithGoogle,
    isSuccess,
    isError,
    error,
  } = useSignUpWithGoogleMutation();
  useEffect(() => {
    if (isString(code) && isString(scope) && isString(prompt)) {
      signUpWithGoogle({
        code,
        scope,
        prompt,
      });
    }
  }, [signUpWithGoogle, code, scope, prompt]);

  useEffect(() => {
    if (isSuccess) {
      window.opener.postMessage({
        isSuccess: true,
      });
      window.close();
    }
  }, [isSuccess]);

  useEffect(() => {
    async function postError() {
      if (isError) {
        try {
          window.opener.postMessage({
            isError: !error.response.ok,
          });
        } finally {
          window.close();
        }
      }
    }

    postError();
  }, [isError, error]);

  return <Loading />;
}
