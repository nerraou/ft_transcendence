import { ChangeEvent } from "react";
import clsx from "clsx";

interface TextInputProps {
  value: string;
  borderColor: string;
  placeholder: string;
  heigth?: "base" | "large";
  width?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function TextInput(props: TextInputProps) {
  let heigth = "h-10";
  const defaultWidth = "w-64";
  const width = props.width || defaultWidth;

  if (props.heigth == "large") {
    heigth = "h-16";
  }

  return (
    <input
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      className={clsx(
        props.borderColor,
        width,
        heigth,
        "border-2 rounded-full bg-light-bg-tertiary outline-none focus:border-dark-useless px-5",
      )}
      onChange={props.onChange}
    />
  );
}

export default TextInput;
