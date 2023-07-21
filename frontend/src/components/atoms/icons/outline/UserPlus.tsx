import { MouseEvent } from "react";

interface UserPlusProps {
  color: string;
  onClick?: (event: MouseEvent<SVGSVGElement>) => void;
}

function UserPlus(props: UserPlusProps) {
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
      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
      <path d="M16 19h6"></path>
      <path d="M19 16v6"></path>
      <path d="M6 21v-2a4 4 0 0 1 4 -4h4"></path>
    </svg>
  );
}

export default UserPlus;
