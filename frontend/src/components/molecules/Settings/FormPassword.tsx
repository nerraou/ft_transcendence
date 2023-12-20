import LabelInputPassword from "./LabelInputPassword";
import ButtonCircle from "@atoms/ButtonCircle";
import Save from "@icons/outline/Save";
import clsx from "clsx";
import { useEffect, useState } from "react";
import usePasswordForm from "./usePasswordForm";
import usePasswordMutation from "./usePasswordMutation";
import { SubmitHandler } from "react-hook-form";

interface FormInputPsswordProps {
  jwt: string | unknown;
}

export interface FormInputPassword {
  currentPassword: string;
  newPassword: string;
}

function FormPassword(props: FormInputPsswordProps) {
  const [isCurrentPasswordVisible, setCurrentPasswordVisibility] =
    useState(false);
  const [isNewPasswordVisible, setNewPasswordVisibility] = useState(false);
  const { register, handleSubmit, formState, getFieldState, setError } =
    usePasswordForm();

  const { mutate, isPending, isError, isSuccess, error } = usePasswordMutation(
    props.jwt,
  );

  function changeCurrentPasswordVisibility() {
    if (isCurrentPasswordVisible == false) {
      setCurrentPasswordVisibility(true);
    } else {
      setCurrentPasswordVisibility(false);
    }
  }

  function changeNewPasswordVisibility() {
    if (isNewPasswordVisible == false) {
      setNewPasswordVisibility(true);
    } else {
      setNewPasswordVisibility(false);
    }
  }

  useEffect(() => {
    if (error?.response?.status === 403) {
      setError("currentPassword", {
        type: "custom",
        message: "Wrong password",
      });
    }
  }, [isError, error, setError]);

  const currentPassword = getFieldState("currentPassword");
  const newPassword = getFieldState("newPassword");

  const onSubmit: SubmitHandler<FormInputPassword> = (data) => mutate(data);

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <LabelInputPassword
        labelValue="Current Password"
        placeholder="**********"
        borderColor={clsx(
          {
            "border-light-fg-secondary": isError || currentPassword.invalid,
          },
          { "border-light-fg-primary": isSuccess || !currentPassword.invalid },
          "dark:border-dark-fg-primary",
        )}
        onPasswordVisibilityChange={changeCurrentPasswordVisibility}
        isPasswordVisible={isCurrentPasswordVisible}
        {...register("currentPassword")}
        errors={formState.errors}
      />

      <LabelInputPassword
        labelValue="New Password"
        placeholder="**********"
        borderColor={clsx(
          {
            "border-light-fg-secondary": isError || newPassword.invalid,
          },
          { "border-light-fg-primary": isSuccess || !newPassword.invalid },
          "dark:border-dark-fg-primary",
        )}
        onPasswordVisibilityChange={changeNewPasswordVisibility}
        isPasswordVisible={isNewPasswordVisible}
        {...register("newPassword")}
        errors={formState.errors}
      />

      <div className="flex justify-center ml-20 sm:ml-0">
        <ButtonCircle
          color="bg-light-fg-link"
          icon={<Save />}
          disabled={isPending}
          loading={isPending}
          type="submit"
        />
      </div>
    </form>
  );
}

export default FormPassword;
