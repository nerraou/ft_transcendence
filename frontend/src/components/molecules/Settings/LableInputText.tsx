import InputText from "@components/atoms/InputText";
import { ChangeEvent } from "react";

interface LablaInputTextProps {
  labelValue: string;
  inputValue?: string;
  placeholder: string;
  error: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LablaInputText(props: LablaInputTextProps) {
  let borderColor = "border-light-fg-primary  dark:border-dark-fg-primary";
  if (props.error) {
    borderColor = "border-dark-fg-secondary  dark:border-dark-fg-primary";
  }
  return (
    <div className="flex space-x-32">
      <div className="w-36">
        <label className="text-light-fg-primary dark:text-light-fg-tertiary">
          {props.labelValue}
        </label>
      </div>
      <InputText
        value={props.inputValue}
        placeholder={props.placeholder}
        borderColor={borderColor}
        width="w-96"
        height="base"
        onChange={props.onChange}
      />
    </div>
  );
}

export default LablaInputText;
