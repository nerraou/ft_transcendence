import InputText from "@components/atoms/InputText";
import { ChangeEvent, forwardRef } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors } from "react-hook-form";
import { FormInputProfile } from "./FormProfile";

interface LabelInputTextProps {
  labelValue: string;
  value?: string;
  name?: string;
  errors?: FieldErrors<FormInputProfile>;
  placeholder: string;
  borderColor: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LabelInputText = forwardRef<HTMLInputElement, LabelInputTextProps>(
  function LabelInputText(props, ref) {
    return (
      <div className="flex sm:flex-col space-x-32 xl:space-x-28 lg:space-x-20 md:space-x-0 sm:space-x-0">
        <div className="w-40 md:w-60">
          <label className="text-light-fg-primary text-base dark:text-light-fg-tertiary">
            {props.labelValue}
          </label>
        </div>
        <div>
          <InputText
            ref={ref}
            name={props.name}
            value={props.value}
            placeholder={props.placeholder}
            borderColor={props.borderColor}
            width="w-96 sm:w-full"
            height="base"
            onChange={props.onChange}
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
  },
);

export default LabelInputText;
