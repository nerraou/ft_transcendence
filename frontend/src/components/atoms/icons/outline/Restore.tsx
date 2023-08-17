import { MouseEvent } from "react";

interface RestoreProps {
  color: string;
  onClick?: (event: MouseEvent<SVGSVGElement>) => void;
}

function Restore(props: RestoreProps) {
  return (
    <svg
      className={props.color}
      onClick={props.onClick}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      stroke-width="2"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M3.06 13a9 9 0 1 0 .49 -4.087"></path>
      <path d="M3 4.001v5h5"></path>
      <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
    </svg>
  );
}

export default Restore;
