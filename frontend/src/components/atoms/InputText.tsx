import { ChangeEvent, forwardRef } from "react";
import clsx from "clsx";

interface InputTextProps {
  value?: string;
  name?: string;
  borderColor: string;
  placeholder: string;
  height?: "base" | "large";
  width?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  function InputText(props, ref) {
    let height = "h-10";
    const defaultWidth = "w-64";
    const width = props.width || defaultWidth;

    if (props.height == "large") {
      height = "h-16";
    }

    return (
      <input
        type="text"
        ref={ref}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        className={clsx(
          props.borderColor,
          width,
          height,
          "border-2 rounded-full bg-light-bg-tertiary outline-none focus:border-dark-useless px-5 text-light-fg-primary",
        )}
        onChange={props.onChange}
      />
    );
  },
);

export default InputText;
