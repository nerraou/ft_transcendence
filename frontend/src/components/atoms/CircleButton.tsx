import clsx from "clsx";
import { MouseEvent } from "react";

interface CircleButtonProps {
  icon: React.ReactNode;
  color: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

function CircleButton(props: CircleButtonProps) {
  return (
    <div className="relative w-14 h-14 rounded-full bg-light-fg-tertiary">
      <button
        onClick={props.onClick}
        className={clsx(
          props.color,
          "absolute flex justify-center items-center bottom-0 w-12 h-12 rounded-full",
        )}
      >
        {props.icon}
      </button>
    </div>
  );
}
export default CircleButton;
