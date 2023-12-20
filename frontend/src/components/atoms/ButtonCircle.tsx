import clsx from "clsx";
import { MouseEvent } from "react";
import Loading from "./icons/outline/Loading";

interface ButtonCircleProps {
  icon: React.ReactNode;
  color: string;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

function ButtonCircle(props: ButtonCircleProps) {
  return (
    <div className="relative w-14 h-14 rounded-full bg-light-fg-tertiary">
      <button
        type={props.type}
        disabled={props.disabled}
        onClick={props.onClick}
        className={clsx(
          props.color,
          "absolute flex justify-center items-center bottom-0 w-12 h-12 rounded-full",
        )}
      >
        {props.loading ? <Loading /> : props.icon}
      </button>
    </div>
  );
}
export default ButtonCircle;
