"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import Loading from "@app/loading";
import TOTPModal from "@components/atoms/TOTPModal";
import { useBoolean } from "@hooks/useBoolean";

import useSignUpWithGoogleMutation from "./useSignUpWithGoogleMutation";

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
  const scope = searchParams.get("scope");
  const prompt = searchParams.get("prompt");

  const [key, setKey] = useState<string>();
  const { value: isTOTPModalVisible, setTrue: showTOTPModal } = useBoolean();

  const {
    mutate: signUpWithGoogle,
    data,
    isPending,
    isSuccess,
    isError,
    error,
  } = useSignUpWithGoogleMutation();
  useEffect(() => {
    if (isString(code) && isString(scope) && isString(prompt)) {
      signUpWithGoogle({
        provider: "google-auth",
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
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      try {
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
              signUpWithGoogle({
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
