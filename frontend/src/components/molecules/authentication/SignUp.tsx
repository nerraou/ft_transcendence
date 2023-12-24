"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import clsx from "clsx";

import InputPassword from "@atoms/InputPassword";
import InputText from "@atoms/InputText";
import Bar from "@atoms/decoration/Bar";
import Button from "@atoms/Button";

import ButtonOAuth from "./ButtonOAuth";
import useSignUpForm from "./useSignUpForm";
import useSignUpMutation from "./useSignUpMutation";
import Modal from "@components/atoms/Modal";
import Link from "next/link";
import { useBoolean } from "@hooks/useBoolean";

export interface FormInput {
  email: string;
  password: string;
}

function SingInRedirect() {
  const router = useRouter();
  return (
    <Button
      text="Sign In"
      onClick={() => {
        router.push("/sign-in");
      }}
    />
  );
}

function SignUpForm() {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const { register, handleSubmit, formState, getFieldState } = useSignUpForm();

  const {
    value: isErrorModalVisible,
    setTrue: showErrorModal,
    setFalse: hideErrorModal,
  } = useBoolean();

  const { mutate, isPending, isError, isSuccess, error } = useSignUpMutation();
  const onSubmit: SubmitHandler<FormInput> = (data) => mutate(data);

  useEffect(() => {
    if (isError) {
      showErrorModal();
    }
  }, [isError, showErrorModal]);

  function changePasswordVisibility() {
    if (isPasswordVisible == false) {
      setPasswordVisibility(true);
    } else {
      setPasswordVisibility(false);
    }
  }

  function getErrorModalDescription() {
    if (!isError) {
      return "";
    }

    if (error.response?.status == 409) {
      return "Email already exists!";
    } else {
      return "Something went wrong!";
    }
  }

  const email = getFieldState("email");
  const password = getFieldState("password");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="m-6 flex flex-col w-full items-center"
    >
      <Modal
        isOpen={isErrorModalVisible}
        onClose={hideErrorModal}
        title="Error"
        description={getErrorModalDescription()}
      />

      <Modal
        isOpen={isSuccess}
        title="Success"
        description="Sign up completed successfully!"
        action={<SingInRedirect />}
      />

      <div className="space-y-4">
        <div>
          <InputText
            borderColor={clsx(
              {
                "border-light-fg-secondary": isError || email.invalid,
              },
              { "border-light-fg-primary": isSuccess || !email.invalid },
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
                "border-light-fg-secondary": isError || password.invalid,
              },
              { "border-light-fg-primary": isSuccess || !password.invalid },
              "dark:border-dark-fg-primary",
            )}
            iconColor="stroke-light-fg-primary dark:stroke-dark-fg-primary"
            placeholder="Password"
            onPasswordVisibilityChange={changePasswordVisibility}
            isPasswordVisible={isPasswordVisible}
            {...register("password")}
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
        Already a ponger?{" "}
        <Link
          href="/sign-in"
          className="text-light-fg-primary dark:text-dark-fg-primary"
        >
          Sign In
        </Link>
      </label>
      <div className="flex m-6 w-full h-36 justify-evenly items-center sm:flex-col">
        <Button text="Sign Up" disabled={isPending} loading={isPending} />
        <ButtonOAuth />
      </div>
    </form>
  );
}

function SignUp() {
  return (
    <div className="box-border rounded-xl border-4 border-light-fg-primary dark:border-dark-fg-primary bg-light-fg-link shadow-light-xl dark:shadow-light-xl sm:no-tailwind dark:sm:shadow-none">
      <Bar reverse width="w-2/3" margin="my-11 mx-28 sm:mx-0" />
      <div
        className="flex flex-col items-center max-h-max mb-24 md:mb-14 sm:mb-0 mx-28 md:mx-16 sm:mx-0 p-xl bg-light-bg-primary
	   border-4 border-light-fg-primary dark:border-dark-fg-primary rounded-xxl"
      >
        <h2 className="text-xxl sm:text-xl text-light-fg-primary dark:text-dark-fg-primary">
          SIGN UP
        </h2>
        <SignUpForm />
      </div>
    </div>
  );
}
export default SignUp;
