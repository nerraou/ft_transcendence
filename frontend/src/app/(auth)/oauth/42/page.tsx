"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import Loading from "@app/loading";

import useSignUpWith42Mutation from "./useSignUpWith42Mutation";

function isString(data: any): data is string {
  return typeof data == "string";
}

export default function GoogleAuth() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const {
    mutate: signUpWith42,
    isSuccess,
    isError,
    error,
  } = useSignUpWith42Mutation();
  useEffect(() => {
    if (isString(code)) {
      signUpWith42({
        code,
      });
    }
  }, [signUpWith42, code]);

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
