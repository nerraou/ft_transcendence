import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FormInput } from "./SignUp";

const userSchema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/,
      "Password required (numbers ,uppercase ,lowercase), at least 8 characters long",
    ),
});

function useSignUpForm() {
  return useForm<FormInput>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(userSchema),
  });
}

export default useSignUpForm;
