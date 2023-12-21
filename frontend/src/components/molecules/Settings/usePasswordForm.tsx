import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FormInputPassword } from "./FormPassword";

const formPasswordlSchema = yup.object({
  currentPassword: yup
    .string()
    .required("Current password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/,
      "(numbers ,uppercase ,lowercase), at least 8 characters long",
    ),
  newPassword: yup
    .string()
    .required("New password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/,
      "(numbers ,uppercase ,lowercase), at least 8 characters long",
    ),
});

function useEmailForm() {
  return useForm<FormInputPassword>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
    resolver: yupResolver(formPasswordlSchema),
  });
}

export default useEmailForm;
