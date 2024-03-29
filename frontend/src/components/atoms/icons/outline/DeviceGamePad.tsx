import clsx from "clsx";
import { MouseEvent } from "react";

interface EmailProps {
  color: string;
  hover?: string;
  round?: string;
  animated?: boolean;
  onClick?: (event: MouseEvent<SVGSVGElement>) => void;
}

function DeviceGamePad(props: EmailProps) {
  return (
    <svg
      className={clsx(props.color, props.hover, props.round, {
        "animate-bounce": props.animated,
      })}
      onClick={props.onClick}
      width="32"
      height="32"
      viewBox="0 0 24 24"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 5h3.5a5 5 0 0 1 0 10h-5.5l-4.015 4.227a2.3 2.3 0 0 1 -3.923 -2.035l1.634 -8.173a5 5 0 0 1 4.904 -4.019h3.4z" />
      <path d="M14 15l4.07 4.284a2.3 2.3 0 0 0 3.925 -2.023l-1.6 -8.232" />
      <path d="M8 9v2" />
      <path d="M7 10h2" />
      <path d="M14 10h2" />
    </svg>
  );
}
export default DeviceGamePad;
