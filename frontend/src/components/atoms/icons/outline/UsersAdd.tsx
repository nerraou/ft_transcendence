import { MouseEvent } from "react";

interface UsersUsersAddProps {
  color: string;
  onClick?: (event: MouseEvent<SVGSVGElement>) => void;
}

function UsersAdd(props: UsersUsersAddProps) {
  return (
    <svg
      onClick={props.onClick}
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
    >
      <path
        d="M1 19V17C1 15.9391 1.42143 14.9217 2.17157 14.1716C2.92172 13.4214 3.93913 13 5 13H9C9.96 13 10.84 13.338 11.53 13.901M14 1.12988C14.8604 1.35018 15.623 1.85058 16.1676 2.55219C16.7122 3.2538 17.0078 4.11671 17.0078 5.00488C17.0078 5.89305 16.7122 6.75596 16.1676 7.45757C15.623 8.15918 14.8604 8.65958 14 8.87988M14 17H20M17 14V20M3 5C3 6.06087 3.42143 7.07828 4.17157 7.82843C4.92172 8.57857 5.93913 9 7 9C8.06087 9 9.07828 8.57857 9.82843 7.82843C10.5786 7.07828 11 6.06087 11 5C11 3.93913 10.5786 2.92172 9.82843 2.17157C9.07828 1.42143 8.06087 1 7 1C5.93913 1 4.92172 1.42143 4.17157 2.17157C3.42143 2.92172 3 3.93913 3 5Z"
        className={props.color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default UsersAdd;
