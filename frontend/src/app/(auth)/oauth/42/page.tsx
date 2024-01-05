"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Loading from "@app/loading";
import { useBoolean } from "@hooks/useBoolean";
import TOOTPModal from "@components/atoms/TOTPModal";

import useSignUpWith42Mutation from "./useSignUpWith42Mutation";

function isString(data: any): data is string {
  return typeof data == "string";
}

export default function GoogleAuth() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const [key, setKey] = useState<string>();
  const { value: isTOTPModalVisible, setTrue: showTOTPModal } = useBoolean();

  const {
    mutate: signUpWith42,
    data,
    isSuccess,
    isError,
    error,
  } = useSignUpWith42Mutation();
  useEffect(() => {
    if (isString(code)) {
      signUpWith42({
        provider: "42-auth",
        code,
      });
    }
  }, [signUpWith42, code]);

  useEffect(() => {
    if (isSuccess) {
      if (data?.error) {
        const errorJson = JSON.parse(data.error);

        if (errorJson.code == "2FA_ENABLED") {
          if (errorJson.key) {
            setKey(errorJson.key);
          }

          return showTOTPModal();
        }
      }

      window.opener.postMessage({
        isSuccess: true,
      });
      window.close();
    }
  }, [isSuccess, data, showTOTPModal]);

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

  if (isTOTPModalVisible) {
    return (
      <TOOTPModal
        isOpen={isTOTPModalVisible}
        isPending={false}
        onVerify={(totp) => {
          if (key) {
            signUpWith42({
              provider: "oauth-totp-verify",
              token: totp,
              key: key,
            });
          }
        }}
      />
    );
  }

  return <Loading />;
}
