import InputPassword from "@components/atoms/InputPassword";
import { ChangeEvent } from "react";

interface LableInputPasswordProps {
  labelValue: string;
  inputValue?: string;
  placeholder: string;
  error: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LableInputPassword(props: LableInputPasswordProps) {
  let borderColor = "border-light-fg-primary dark:border-dark-fg-primary ";
  let iconColor = "stroke-light-fg-primary dark:stroke-dark-fg-primary ";
  if (props.error) {
    borderColor = "border-dark-fg-secondary";
    iconColor = "stroke-light-fg-secondary";
  }
  return (
    <div className="flex space-x-32 xl:space-x-28 lg:space-x-20">
      <div className="w-40">
        <label className="text-light-fg-primary text-base dark:text-light-fg-tertiary">
          {props.labelValue}
        </label>
      </div>
      <InputPassword
        iconColor={iconColor}
        borderColor={borderColor}
        placeholder={props.labelValue}
        onChange={props.onChange}
        width="w-96 lg:w-60"
      />
    </div>
  );
}

export default LableInputPassword;
