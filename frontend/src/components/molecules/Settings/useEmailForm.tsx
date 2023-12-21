import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FormInputEmail } from "./FormEmail";

const formEmailSchema = yup.object({
  email: yup.string().email("Try a valid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/,
      "(numbers ,uppercase ,lowercase), at least 8 characters long",
    ),
});

function useEmailForm(props: FormInputEmail) {
  return useForm<FormInputEmail>({
    defaultValues: {
      email: props.email,
    },
    resolver: yupResolver(formEmailSchema),
  });
}

export default useEmailForm;
