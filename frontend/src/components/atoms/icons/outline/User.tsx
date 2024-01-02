import clsx from "clsx";
import { MouseEvent } from "react";

interface UserProps {
  color: string;
  hover?: string;
  round?: string;
  onClick?: (event: MouseEvent<SVGSVGElement>) => void;
}

function User(props: UserProps) {
  return (
    <svg
      className={clsx(props.color, props.hover, props.round)}
      onClick={props.onClick}
      width="32"
      height="32"
      viewBox="0 0 24 24"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
      <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
    </svg>
  );
}

export default User;
