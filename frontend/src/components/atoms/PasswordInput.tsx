import { ChangeEvent } from "react";
import clsx from "clsx";
import Eye from "@icons/outline/Eye";
import EyeOff from "./icons/outline/EyeOff";

interface PasswordInputProps {
  value: string;
  borderColor: string;
  placeholder: string;
  width?: string;
  height?: "base" | "large";
  isPasswordVisible?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPasswordVisibilityChange?: () => void;
}

function PasswordInput(props: PasswordInputProps) {
  let height = "h-10";
  const defaultWidth = "w-64";
  const width = props.width || defaultWidth;
  let type = "password";

  if (props.height == "large") {
    height = "h-16";
  }

  if (props.isPasswordVisible) {
    type = "text";
  }

  return (
    <div
      className={clsx(
        props.borderColor,
        width,
        height,
        "border-2 rounded-full bg-light-bg-tertiary outline-none focus-within:border-dark-useless",
        "flex justify-between items-center box-border px-5 overflow-hidden",
      )}
    >
      <input
        type={type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        className="bg-light-bg-tertiary w-full outline-none"
      />

      {props.isPasswordVisible && (
        <Eye
          color="stroke-dark-fg-primary"
          onClick={props.onPasswordVisibilityChange}
        />
      )}

      {!props.isPasswordVisible && (
        <EyeOff
          color="stroke-dark-fg-primary"
          onClick={props.onPasswordVisibilityChange}
        />
      )}
    </div>
  );
}

export default PasswordInput;
