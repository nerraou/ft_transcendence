"use client";

import PasswordInput from "@components/atoms/PasswordInput";
import TextInput from "@components/atoms/TextInput";
import Bar from "@components/atoms/decoration/Bar";
import Link from "next/link";
import ButtonOAuth from "./ButtonOAuth";
import Button from "@components/atoms/Button";

function SignInForm() {
  function handlerInput() {
    return;
  }
  function handlePassword() {
    return;
  }
  return (
    <form className="m-6 flex flex-col items-center w-full">
      <div className="grid grid-rows-2 gap-4">
        <TextInput
          borderColor="border-light-fg-primary dark:border-dark-fg-primary"
          textColor="text-light-fg-primary dark:text-dark-fg-primary"
          placeholder="Email"
          height="large"
          width="w-80 sm:w-64"
          value="noha@gmail.com"
          onChange={handlerInput}
        />
        <PasswordInput
          height="large"
          width="w-80 sm:w-64"
          textColor="text-light-fg-primary dark:text-dark-fg-primary"
          borderColor="border-light-fg-primary dark:border-dark-fg-primary"
          iconColor="stroke-light-fg-primary dark:stroke-dark-fg-primary"
          placeholder="Password"
          value="1234"
          onChange={handlePassword}
        />
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
        <Button text="Sign In" />
        <ButtonOAuth />
      </div>
    </form>
  );
}

function SignIn() {
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
export default SignIn;
