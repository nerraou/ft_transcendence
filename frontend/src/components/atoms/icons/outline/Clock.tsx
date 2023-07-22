import { MouseEvent } from "react";

interface ClockProps {
  color: string;
  onClick?: (event: MouseEvent<SVGSVGElement>) => void;
}

function Clock(props: ClockProps) {
  return (
    <svg
      className={props.color}
      onClick={props.onClick}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="1"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
      <path d="M12 12h3.5"></path>
      <path d="M12 7v5"></path>
    </svg>
  );
}

export default Clock;
