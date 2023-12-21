import { useEffect, useState } from "react";
import ButtonsSaveRestore from "./ButtonsSaveRestore";
import LabelInputPassword from "./LabelInputPassword";
import LabelInputText from "./LabelInputText";
import useEmailMutation from "./useEmailMutation";
import { SubmitHandler } from "react-hook-form";
import clsx from "clsx";
import useEmailForm from "./useEmailForm";

interface FormInputEmailProps {
  jwt: string | unknown;
  email: string;
}
export interface FormInputEmail {
  email: string;
  password: string;
}

function FormEmail(props: FormInputEmailProps) {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const { register, handleSubmit, formState, getFieldState, setError, reset } =
    useEmailForm({
      email: props.email,
      password: "",
    });

  const { mutate, isPending, isError, isSuccess, error } = useEmailMutation(
    props.jwt,
  );

  const onSubmit: SubmitHandler<FormInputEmail> = (data) => mutate(data);

  function changePasswordVisibility() {
    if (isPasswordVisible == false) {
      setPasswordVisibility(true);
    } else {
      setPasswordVisibility(false);
    }
  }

  useEffect(() => {
    if (error?.response?.status === 409) {
      setError("email", {
        type: "custom",
        message: "This email is already exist",
      });
    }
    if (error?.response?.status === 403) {
      setError("password", {
        type: "custom",
        message: "Wrong password",
      });
    }
  }, [isError, error, setError]);

  const email = getFieldState("email");
  const password = getFieldState("password");

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <LabelInputPassword
        labelValue="Current Password"
        placeholder="**********"
        borderColor={clsx(
          {
            "border-light-fg-secondary": isError || password.invalid,
          },
          { "border-light-fg-primary": isSuccess || !password.invalid },
          "dark:border-dark-fg-primary",
        )}
        onPasswordVisibilityChange={changePasswordVisibility}
        isPasswordVisible={isPasswordVisible}
        {...register("password")}
        errors={formState.errors}
      />

      <LabelInputText
        labelValue="Email"
        placeholder="Email"
        borderColor={clsx(
          {
            "border-light-fg-secondary": isError || email.invalid,
          },
          { "border-light-fg-primary": isSuccess || !email.invalid },
          "dark:border-dark-fg-primary",
        )}
        errors={formState.errors}
        {...register("email")}
      />

      <ButtonsSaveRestore
        isSaveLoading={isPending}
        isSavePenging={isPending}
        onClick={() => {
          reset({
            email: props.email,
            password: "",
          });
        }}
      />
    </form>
  );
}

export default FormEmail;
