import { MouseEvent } from "react";

interface AddProps {
  color: string;
  onClick?: (event: MouseEvent<SVGSVGElement>) => void;
}

function Side(props: AddProps) {
  return (
    <svg
      width="12"
      height="22"
      viewBox="0 0 12 22"
      fill="none"
      className={props.color}
      onClick={props.onClick}
    >
      <path
        d="M1 21L11 11L1 1V21Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Side;
