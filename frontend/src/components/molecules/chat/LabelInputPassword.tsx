import InputPassword from "@atoms/InputPassword";
import { ErrorMessage } from "@hookform/error-message";
// import { ErrorMessage } from "@hookform/error-message";
import { ChangeEvent, forwardRef } from "react";
import { FieldErrors } from "react-hook-form";

interface LabelInputPasswordProps {
  labelValue: string;
  value?: string;
  name?: string;
  errors?: FieldErrors<any>;
  placeholder: string;
  borderColor: string;
  isDisabled?: boolean;
  isPasswordVisible: boolean;
  onPasswordVisibilityChange?: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LabelInputPassword = forwardRef<
  HTMLInputElement,
  LabelInputPasswordProps
>(function LabelInputPassword(props, ref) {
  return (
    <div className="flex lg:flex-col md:flex-col sm:flex-col space-x-32 lg:space-x-0 md:space-x-0 sm:space-x-0">
      <div className="w-56 xl:w-60">
        <label className="text-dark-bg-primary text-lg ">
          {props.labelValue}
        </label>
      </div>

      <div className="border-solid border-light-fg-tertiary">
        <InputPassword
          ref={ref}
          value={props.value}
          name={props.name}
          iconColor="stroke-light-fg-primary dark:stroke-dark-fg-primary"
          borderColor={props.borderColor}
          placeholder={props.placeholder}
          onChange={props.onChange}
          onPasswordVisibilityChange={props.onPasswordVisibilityChange}
          isPasswordVisible={props.isPasswordVisible}
          width="w-96 sm:w-full md:w-full"
          isDisabled={props.isDisabled}
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
