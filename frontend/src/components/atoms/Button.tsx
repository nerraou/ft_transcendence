import { MouseEvent } from "react";
import clsx from "clsx";
import Loading from "./icons/outline/Loading";

interface ButtonProps {
  text: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

function Button(props: ButtonProps) {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={clsx(
        " border-light-fg-primary flex justify-center items-center",
        "dark:border-dark-fg-primary bg-light-fg-link border",
        "rounded-full w-52 h-14 text-light-bg-tertiary text-base",
      )}
    >
      {props.disabled ? <Loading /> : props.text}
    </button>
  );
}

export default Button;
