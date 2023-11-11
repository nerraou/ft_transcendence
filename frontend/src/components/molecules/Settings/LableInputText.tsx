import InputText from "@components/atoms/InputText";
import { ChangeEvent } from "react";

interface LableInputTextProps {
  labelValue: string;
  inputValue?: string;
  placeholder: string;
  error: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LableInputText(props: LableInputTextProps) {
  let borderColor = "border-light-fg-primary dark:border-dark-fg-primary";
  if (props.error) {
    borderColor = "border-dark-fg-secondary dark:border-dark-fg-primary";
  }
  return (
    <div className="flex space-x-32 xl:space-x-28 lg:space-x-20">
      <div className="w-40">
        <label className="text-light-fg-primary text-base dark:text-light-fg-tertiary">
          {props.labelValue}
        </label>
      </div>
      <InputText
        value={props.inputValue}
        placeholder={props.placeholder}
        borderColor={borderColor}
        width="w-96 lg:w-60"
        height="base"
        onChange={props.onChange}
      />
    </div>
  );
}

export default LableInputText;
