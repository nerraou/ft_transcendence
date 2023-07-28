import { MouseEvent } from "react";

interface PencilProps {
  color: string;
  onClick?: (event: MouseEvent<SVGSVGElement>) => void;
}

function Pencil(props: PencilProps) {
  return (
    <svg
      className={props.color}
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
      <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
      <path d="M13.5 6.5l4 4" />
    </svg>
  );
}

export default Pencil;
