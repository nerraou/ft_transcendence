import { ChangeEvent } from "react";
import clsx from "clsx";

interface TextInputProps {
  value: string;
  borderColor: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function TextInput(props: TextInputProps) {
  return (
    <input
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      className={clsx(
        props.borderColor,
        "border-2 rounded-full w-64 h-10 bg-light-bg-tertiary outline-none focus:border-light-bg-secondary",
      )}
      onChange={props.onChange}
    />
  );
}

export default TextInput;
