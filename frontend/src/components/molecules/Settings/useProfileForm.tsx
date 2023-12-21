import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FormInputProfile } from "./FormProfile";

const formProfileSchema = yup.object({
  username: yup.string().required("Username is required"),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
});

function useProfileForm(props: FormInputProfile) {
  return useForm<FormInputProfile>({
    defaultValues: {
      username: props.username,
      firstName: props.firstName,
      lastName: props.lastName,
    },
    resolver: yupResolver(formProfileSchema),
  });
}

export default useProfileForm;
