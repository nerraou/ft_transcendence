import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";

import ButtonsSaveRestore from "./ButtonsSaveRestore";
import LabelInputText from "./LabelInputText";
import Enable2FA from "./Enable2FA";
import TFAModal from "./TFAModal";

import useProfileMutation from "./useProfileMutation";
import { SubmitHandler } from "react-hook-form";
import useProfileForm from "./useProfileForm";
import clsx from "clsx";
import useDisable2FA from "./useDisable2FA";

interface FormInputProfileProps {
  jwt: string | unknown;
  username: string;
  firstName: string;
  lastName: string;
  is2faEnabled: boolean;
}

export interface FormInputProfile {
  username: string;
  firstName: string;
  lastName: string;
}

function FormProfile(props: FormInputProfileProps) {
  const [enable2FA, setEnable2FA] = useState(props.is2faEnabled);
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, formState, getFieldState, setError, reset } =
    useProfileForm({
      lastName: props.lastName,
      firstName: props.firstName,
      username: props.username,
    });

  const { mutate, isPending, isError, isSuccess, error } = useProfileMutation(
    props.jwt,
  );

  const disable2FAMutation = useDisable2FA({ jwt: props.jwt });

  useEffect(() => {
    if (error?.response?.status === 409) {
      setError("username", {
        type: "custom",
        message: "This username is already exist",
      });
    }
  }, [isError, error, setError]);

  useEffect(() => {
    if (disable2FAMutation.isSuccess) {
      setEnable2FA(false);
      toast.success("2FA disabled", {
        position: "bottom-center",
      });
    }
  }, [disable2FAMutation.isSuccess]);

  const onSubmit: SubmitHandler<FormInputProfile> = (data) => mutate(data);

  const username = getFieldState("username");
  const firstName = getFieldState("firstName");
  const lastName = getFieldState("lastName");

  function onChange(value: boolean) {
    if (value) {
      setIsOpen(true);
    } else {
      disable2FAMutation.mutate();
    }
  }

  function onClose() {
    return setIsOpen(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <LabelInputText
        labelValue="Username"
        placeholder="Username"
        borderColor={clsx(
          {
            "border-light-fg-secondary": isError || username.invalid,
          },
          { "border-light-fg-primary": isSuccess || !username.invalid },
          "dark:border-dark-fg-primary",
        )}
        errors={formState.errors}
        {...register("username")}
      />

      <LabelInputText
        borderColor={clsx(
          {
            "border-light-fg-secondary": isError || firstName.invalid,
          },
          { "border-light-fg-primary": isSuccess || !firstName.invalid },
          "dark:border-dark-fg-primary",
        )}
        labelValue="First Name"
        placeholder="First Name"
        {...register("firstName")}
        errors={formState.errors}
      />

      <LabelInputText
        borderColor={clsx(
          {
            "border-light-fg-secondary": isError || lastName.invalid,
          },
          { "border-light-fg-primary": isSuccess || !lastName.invalid },
          "dark:border-dark-fg-primary",
        )}
        labelValue="Last Name"
        placeholder="Last Name"
        {...register("lastName")}
        errors={formState.errors}
      />

      <Enable2FA checked={enable2FA} onChange={onChange} />
      <Suspense fallback={null}>
        <TFAModal
          isOpen={isOpen}
          onClose={onClose}
          jwt={props.jwt}
          onSuccess={() => {
            setEnable2FA(true);
          }}
        />
      </Suspense>
      <ButtonsSaveRestore
        isSaveLoading={isPending}
        isSavePenging={isPending}
        onClick={() => {
          reset({
            username: props.username,
            firstName: props.firstName,
            lastName: props.lastName,
          });
        }}
      />
    </form>
  );
}

export default FormProfile;
