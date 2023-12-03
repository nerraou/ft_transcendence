"use client";

import Link from "next/link";
import { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";

import InputPassword from "@atoms/InputPassword";
import InputText from "@atoms/InputText";
import Bar from "@atoms/decoration/Bar";
import Button from "@atoms/Button";

import ButtonOAuth from "./ButtonOAuth";
import useSignUpForm from "./useSignUpForm";
import useSignUpMutation from "./useSignUpMutation";

export interface FormInput {
  email: string;
  password: string;
}

function SignUpForm() {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const { register, handleSubmit, formState } = useSignUpForm();

  const mutation = useSignUpMutation();
  const onSubmit: SubmitHandler<FormInput> = (data) => mutation.mutate(data);

  function changePasswordVisibility() {
    if (isPasswordVisible == false) {
      setPasswordVisibility(true);
    } else {
      setPasswordVisibility(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="m-6 flex flex-col w-full items-center"
    >
      <div className="space-y-4">
        <div>
          <InputText
            borderColor="border-light-fg-primary dark:border-dark-fg-primary"
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
            borderColor="border-light-fg-primary dark:border-dark-fg-primary"
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
          href="/sign-up"
          className="text-light-fg-primary dark:text-dark-fg-primary"
        >
          Sign In
        </Link>
      </label>
      <div className="flex m-6 w-full h-36 justify-evenly items-center sm:flex-col">
        <Button text="Sign Up" />
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
