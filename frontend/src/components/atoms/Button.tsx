import { MouseEvent } from "react";
import clsx from "clsx";

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
        " border-light-fg-primary ",
        "dark:border-dark-fg-primary border rounded-full w-52 h-14 text-light-bg-tertiary text-base",
        { "bg-light-bg-secondary": props.disabled },
        { "bg-light-fg-link": !props.disabled },
      )}
    >
      {props.text}
    </button>
  );
}

export default Button;
