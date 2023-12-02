"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import InputPassword from "@atoms/InputPassword";
import InputText from "@atoms/InputText";
import Bar from "@atoms/decoration/Bar";
import Link from "next/link";
import Button from "@atoms/Button";

import ButtonOAuth from "./ButtonOAuth";
import { useMutation } from "@tanstack/react-query";

interface FormInput {
  email: string;
  password: string;
}

async function singUpUser(newUser: FormInput) {
  const api = "https://api.pongboy.me/auth/sign-up";
  console.log(newUser);
  return await fetch(api, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(newUser),
  });
}

const userSchema = object({
  email: string().email().required("required!"),
  password: string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
    )
    .required(),
});

function SignUpForm() {
  const { register, handleSubmit, formState } = useForm<FormInput>({
    resolver: yupResolver(userSchema),
  });

  const mutation = useMutation({
    mutationFn: singUpUser,
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => mutation.mutate(data);

  console.log(formState.errors);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="m-6 flex flex-col w-full items-center"
    >
      <div className="grid grid-rows-2 gap-4">
        <InputText
          borderColor="border-light-fg-primary dark:border-dark-fg-primary"
          placeholder="Email"
          height="large"
          width="w-80 sm:w-64"
          {...register("email")}
        />
        <InputPassword
          height="large"
          width="w-80 sm:w-64"
          borderColor="border-light-fg-primary dark:border-dark-fg-primary"
          iconColor="stroke-light-fg-primary dark:stroke-dark-fg-primary"
          placeholder="Password"
          {...register("password")}
        />
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
