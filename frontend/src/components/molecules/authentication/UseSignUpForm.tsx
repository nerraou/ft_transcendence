import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FormInput {
  email: string;
  password: string;
}

const userSchema = yup.object({
  email: yup.string().email().required("required!"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
    )
    .required(),
});

function UseSignUpForm() {
  return useForm<FormInput>({
    resolver: yupResolver(userSchema),
  });
}

export default UseSignUpForm;
