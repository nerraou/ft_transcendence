import { MouseEvent } from "react";
import clsx from "clsx";
import Loading from "./icons/outline/Loading";
import Check from "./icons/outline/Check";

interface ButtonProps {
  text: string;
  disabled?: boolean;
  loading?: boolean;
  isSuccess?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  customStyle?: string;
}

function Button(props: ButtonProps) {
  return (
    <button
      disabled={props.disabled || props.loading}
      onClick={props.onClick}
      className={clsx(
        "border-light-fg-primary flex justify-center items-center",
        "dark:border-dark-fg-primary bg-light-fg-link border",
        "rounded-full w-52 h-14 text-light-bg-tertiary text-base",
        props.customStyle,
      )}
    >
      {props.loading ? <Loading /> : props.isSuccess ? <Check /> : props.text}
    </button>
  );
}

export default Button;
