"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import Loading from "@app/loading";
import { useBoolean } from "@hooks/useBoolean";
import TOTPModal from "@components/atoms/TOTPModal";

import useSignUpWith42Mutation from "./useSignUpWith42Mutation";

function isString(data: any): data is string {
  return typeof data == "string";
}

function parseError(error: string | null | undefined) {
  if (!error) {
    return null;
  }

  try {
    return JSON.parse(error);
  } catch {}

  return null;
}

export default function GoogleAuth() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const [key, setKey] = useState<string>();
  const { value: isTOTPModalVisible, setTrue: showTOTPModal } = useBoolean();

  const {
    mutate: signUpWith42,
    data,
    isPending,
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
      window.opener.postMessage({
        isSuccess: true,
      });
      window.close();
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      if (error.cause.error) {
        const errorJson = parseError(error.cause.error);

        if (errorJson?.code == "2FA_ENABLED") {
          if (errorJson.key) {
            setKey(errorJson.key);
          } else {
            toast.error("invalid otp");
          }

          return showTOTPModal();
        }
      }
      try {
        window.opener.postMessage({
          isError: !error.cause.ok,
        });
      } finally {
        window.close();
      }
    }
  }, [isError, error, showTOTPModal]);

  if (isTOTPModalVisible) {
    return (
      <>
        <TOTPModal
          isOpen={isTOTPModalVisible}
          isPending={isPending}
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
        <Toaster position="top-right" />
      </>
    );
  }

  return <Loading />;
}
