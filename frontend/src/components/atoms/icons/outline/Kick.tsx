import { MouseEvent } from "react";

interface KickProps {
  color: string;
  onClick?: (event: MouseEvent<SVGSVGElement>) => void;
}

function Kick(props: KickProps) {
  return (
    <svg
      width="19"
      height="20"
      viewBox="0 0 19 20"
      className={props.color}
      onClick={props.onClick}
      fill="none"
    >
      <path
        d="M1 7L5.5 8L8.5 10.5M11 19V11L14 5.5M14 5.5L10 4.5L6 2.5M14 5.5L18 9L16 12.5M15 2C15 2.26522 15.1054 2.51957 15.2929 2.70711C15.4804 2.89464 15.7348 3 16 3C16.2652 3 16.5196 2.89464 16.7071 2.70711C16.8946 2.51957 17 2.26522 17 2C17 1.73478 16.8946 1.48043 16.7071 1.29289C16.5196 1.10536 16.2652 1 16 1C15.7348 1 15.4804 1.10536 15.2929 1.29289C15.1054 1.48043 15 1.73478 15 2Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Kick;
