import { ChangeEvent } from "react";
import clsx from "clsx";
import Eye from "@icons/outline/Eye";
import EyeOff from "./icons/outline/EyeOff";

interface PasswordInputProps {
  value: string;
  borderColor: string;
  placeholder: string;
  width?: string;
  higth?: "h-10" | "h-16";
  isPasswordVisible?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPasswordVisibilityChange?: () => void;
}

function PasswordInput(props: PasswordInputProps) {
  const defaultWidth = "w-64";
  const width = props.width || defaultWidth;
  let type = "password";

  if (props.isPasswordVisible) {
    type = "text";
  }

  return (
    <div
      className={clsx(
        props.borderColor,
        width,
        "border-2 rounded-full bg-light-bg-tertiary outline-none focus-within:border-light-bg-secondary h-10",
        "flex justify-between items-center box-border px-5 overflow-hidden",
        props.higth,
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
          color="stroke-light-fg-primary"
          onClick={props.onPasswordVisibilityChange}
        />
      )}

      {!props.isPasswordVisible && (
        <EyeOff
          color="stroke-light-fg-primary"
          onClick={props.onPasswordVisibilityChange}
        />
      )}
    </div>
  );
}

export default PasswordInput;
