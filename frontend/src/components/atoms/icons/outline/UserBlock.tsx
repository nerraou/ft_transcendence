import { MouseEvent } from "react";

interface UserBlockProps {
  color: string;
  onClick?: (event: MouseEvent<SVGSVGElement>) => void;
}

function UserBlock(props: UserBlockProps) {
  return (
    <svg
      className={props.color}
      onClick={props.onClick}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
      <path d="M6 21v-2a4 4 0 0 1 4 -4h3.5" />
      <path d="M19 19m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M17 21l4 -4" />
    </svg>
  );
}

export default UserBlock;
