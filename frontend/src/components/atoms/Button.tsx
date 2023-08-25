import { MouseEvent } from "react";

interface ButtonProps {
  text: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className="bg-light-fg-link border-light-fg-primary dark:border-dark-fg-primary border rounded-full w-52 h-14 text-light-bg-tertiary text-base"
    >
      {props.text}
    </button>
  );
}

export default Button;
