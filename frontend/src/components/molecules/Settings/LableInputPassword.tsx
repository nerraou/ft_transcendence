import InputPassword from "@components/atoms/InputPassword";
import { ChangeEvent } from "react";

interface LablaInputPasswordProps {
  labelValue: string;
  inputValue?: string;
  placeholder: string;
  error: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LableInputPassword(props: LablaInputPasswordProps) {
  let borderColor = "border-light-fg-primary";
  let iconColor = "stroke-light-fg-primary";
  if (props.error) {
    borderColor = "border-dark-fg-secondary";
    iconColor = "stroke-light-fg-secondary";
  }
  return (
    <div className="flex space-x-32">
      <div className="w-36">
        <label className="text-light-fg-primary">{props.labelValue}</label>
      </div>
      <InputPassword
        iconColor={iconColor}
        borderColor={borderColor}
        placeholder={props.labelValue}
        onChange={props.onChange}
      />
    </div>
  );
}

export default LableInputPassword;
