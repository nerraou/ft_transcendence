import { MouseEvent } from "react";

interface AddProps {
  color: string;
  onClick?: (event: MouseEvent<SVGSVGElement>) => void;
}

function Add(props: AddProps) {
  return (
    <svg
      onClick={props.onClick}
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      className={props.color}
    >
      <path
        d="M9 13H17M13 9V17M1 13C1 14.5759 1.31039 16.1363 1.91345 17.5922C2.5165 19.0481 3.40042 20.371 4.51472 21.4853C5.62902 22.5996 6.95189 23.4835 8.4078 24.0866C9.86371 24.6896 11.4241 25 13 25C14.5759 25 16.1363 24.6896 17.5922 24.0866C19.0481 23.4835 20.371 22.5996 21.4853 21.4853C22.5996 20.371 23.4835 19.0481 24.0866 17.5922C24.6896 16.1363 25 14.5759 25 13C25 9.8174 23.7357 6.76516 21.4853 4.51472C19.2348 2.26428 16.1826 1 13 1C9.8174 1 6.76516 2.26428 4.51472 4.51472C2.26428 6.76516 1 9.8174 1 13Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Add;
