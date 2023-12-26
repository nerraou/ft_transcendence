"use client";

import { useState } from "react";
import Link from "next/link";
import { ErrorMessage } from "@hookform/error-message";
import { SubmitHandler } from "react-hook-form";
import { SignInResponse, signIn } from "next-auth/react";
import clsx from "clsx";

import InputPassword from "@atoms/InputPassword";
import InputText from "@atoms/InputText";
import Bar from "@atoms/decoration/Bar";
import Button from "@atoms/Button";
import Modal from "@atoms/Modal";
import { useBoolean } from "@hooks/useBoolean";

import ButtonOAuth from "./ButtonOAuth";
import useSignInForm from "./useSignInForm";
import { useRouter } from "next/navigation";

export interface FormInput {
  email: string;
  password: string;
}

interface redirectProps {
  path: string;
  text: string;
}

function Redirect(props: redirectProps) {
  const router = useRouter();
  return (
    <Button
      text={props.text}
      onClick={() => {
        router.replace(props.path);
      }}
    />
  );
}

function SignInForm() {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const { register, formState, getFieldState, handleSubmit } = useSignInForm();
  const [res, setRes] = useState<SignInResponse | undefined>();
  const [isLoading, setLoading] = useState(false);

  const { value: isSuccessModalVisible, setTrue: showSuccessModal } =
    useBoolean();
  const {
    value: isErrorModalVisible,
    setTrue: showErrorModal,
    setFalse: hideErrorModal,
  } = useBoolean();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      setLoading(true);
      setRes(undefined);
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      setLoading(false);

      if (response?.ok) {
        showSuccessModal();
      } else {
        setRes(response);
        showErrorModal();
      }
    } catch (error) {
      setLoading(false);
    }
  };

  function changePasswordVisibility() {
    if (isPasswordVisible == false) {
      setPasswordVisibility(true);
    } else {
      setPasswordVisibility(false);
    }
  }

  function onErrorModalClose() {
    hideErrorModal();
  }

  function getErrorModalProps() {
    if (res?.status == 401) {
      return {
        description: "The Email/password combination is not valid",
        action: <Redirect path="sign-up" text="Create account" />,
      };
    }

    return {
      description: "Something went wrong!",
    };
  }

  const email = getFieldState("email");
  const password = getFieldState("password");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="m-6 flex flex-col items-center w-full"
    >
      <Modal
        isOpen={isErrorModalVisible}
        onClose={onErrorModalClose}
        title="Error"
        {...getErrorModalProps()}
      />

      <Modal
        isOpen={isSuccessModalVisible}
        title="Welcom to BongBoy"
        description="Complete your acount from here"
        action={<Redirect path="/profile/settings" text="Settings" />}
      />

      <div className="space-y-4">
        <div>
          <InputText
            borderColor={clsx(
              {
                "border-light-fg-secondary": email.invalid,
                "border-light-fg-primary": !email.invalid,
              },
              "dark:border-dark-fg-primary",
            )}
            placeholder="Email"
            height="large"
            width="w-80 sm:w-64"
            {...register("email")}
          />
          <ErrorMessage
            errors={formState.errors}
            name="email"
            render={({ message }) => (
              <p className="text-light-fg-secondary">{message}</p>
            )}
          />
        </div>

        <div>
          <InputPassword
            height="large"
            width="w-80 sm:w-64"
            borderColor={clsx(
              {
                "border-light-fg-secondary": password.invalid,
                "border-light-fg-primary": !password.invalid,
              },
              "dark:border-dark-fg-primary",
            )}
            iconColor="stroke-light-fg-primary dark:stroke-dark-fg-primary"
            placeholder="Password"
            {...register("password")}
            isPasswordVisible={isPasswordVisible}
            onPasswordVisibilityChange={changePasswordVisibility}
          />
          <ErrorMessage
            errors={formState.errors}
            name="password"
            render={({ message }) => (
              <div className="text-light-fg-secondary w-80 sm:w-64">
                {message}
              </div>
            )}
          />
        </div>
      </div>
      <label className="text-xl sm:text-base text-light-fg-tertiary m-6">
        You don’t have an account?{" "}
        <Link
          href="/sign-up"
          className="text-light-fg-primary dark:text-dark-fg-primary"
        >
          Sign Up
        </Link>
      </label>
      <div className="flex m-6 w-full h-36 justify-evenly items-center sm:flex-col">
        <Button text="Sign In" disabled={isLoading} loading={isLoading} />
        <ButtonOAuth />
      </div>
    </form>
  );
}

function SignInComponent() {
  return (
    <div className="box-border rounded-xl border-4 border-light-fg-primary dark:border-dark-fg-primary bg-light-fg-link shadow-light-xl dark:shadow-light-xl sm:no-tailwind dark:sm:shadow-none">
      <Bar reverse width="w-2/3" margin="my-11 mx-28 sm:mx-0" />
      <div
        className="flex flex-col items-center max-h-max mb-24 md:mb-14 sm:mb-0 mx-28 md:mx-16 sm:mx-0 p-xl bg-light-bg-primary
	   border-4 border-light-fg-primary dark:border-dark-fg-primary rounded-xxl"
      >
        <h2 className="text-xxl sm:text-xl text-light-fg-primary dark:text-dark-fg-primary">
          SIGN IN
        </h2>
        <SignInForm />
      </div>
    </div>
  );
}
export default SignInComponent;
