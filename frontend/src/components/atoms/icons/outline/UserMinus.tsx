import { MouseEvent } from "react";

interface UserMinusProps {
  color: string;
  onClick?: (event: MouseEvent<SVGSVGElement>) => void;
}

function UserMinus(props: UserMinusProps) {
  return (
    <svg
      className={props.color}
      onClick={props.onClick}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="#2c3e50"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
      <path d="M6 21v-2a4 4 0 0 1 4 -4h4c.348 0 .686 .045 1.009 .128" />
      <path d="M16 19h6" />
    </svg>
  );
}

export default UserMinus;
