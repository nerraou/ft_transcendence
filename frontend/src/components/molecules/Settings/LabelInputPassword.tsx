import InputPassword from "@atoms/InputPassword";
import { ErrorMessage } from "@hookform/error-message";
import { ChangeEvent, forwardRef } from "react";
import { FieldErrors } from "react-hook-form";
import { FormInputEmail } from "./FormEmail";

interface LabelInputPasswordProps {
  labelValue: string;
  value?: string;
  name?: string;
  errors?: FieldErrors<FormInputEmail>;
  placeholder: string;
  borderColor: string;
  isPasswordVisible: boolean;
  onPasswordVisibilityChange?: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LabelInputPassword = forwardRef<
  HTMLInputElement,
  LabelInputPasswordProps
>(function LabelInputPassword(props, ref) {
  return (
    <div className="flex sm:flex-col space-x-32 xl:space-x-28 lg:space-x-20 md:space-x-0 sm:space-x-0">
      <div className="w-40 md:w-60">
        <label className="text-light-fg-primary text-base dark:text-light-fg-tertiary">
          {props.labelValue}
        </label>
      </div>
      <div className="border-solid border-light-fg-tertiary">
        <InputPassword
          ref={ref}
          name={props.name}
          iconColor="stroke-light-fg-primary dark:stroke-dark-fg-primary"
          borderColor={props.borderColor}
          placeholder={props.placeholder}
          onChange={props.onChange}
          onPasswordVisibilityChange={props.onPasswordVisibilityChange}
          isPasswordVisible={props.isPasswordVisible}
          width="w-96 sm:w-full"
        />
        <ErrorMessage
          errors={props.errors}
          name={props.name as any}
          render={({ message }) => (
            <p className="text-light-fg-secondary">{message}</p>
          )}
        />
      </div>
    </div>
  );
});

export default LabelInputPassword;
