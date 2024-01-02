import { MouseEvent } from "react";

interface MuteProps {
  color: string;
  onClick?: (event: MouseEvent<SVGSVGElement>) => void;
}

function Mute(props: MuteProps) {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      className={props.color}
      onClick={props.onClick}
      fill="none"
    >
      <path
        d="M1 2L19 20M7 4C7 3.20435 7.31607 2.44129 7.87868 1.87868C8.44129 1.31607 9.20435 1 10 1C10.7956 1 11.5587 1.31607 12.1213 1.87868C12.6839 2.44129 13 3.20435 13 4V9C13 9.29615 12.9562 9.59068 12.87 9.874M10.87 11.874C10.4217 12.0099 9.94776 12.0388 9.48623 11.9586C9.02469 11.8784 8.58836 11.6912 8.21217 11.412C7.83599 11.1328 7.53041 10.7694 7.31992 10.3509C7.10942 9.93244 6.99986 9.47046 7 9.002V8.002M3 9C2.99978 10.2633 3.34146 11.5032 3.98881 12.5881C4.63616 13.673 5.56505 14.5624 6.67697 15.1622C7.78888 15.7619 9.04238 16.0495 10.3045 15.9946C11.5667 15.9396 12.7904 15.5441 13.846 14.85M15.846 12.85C16.5998 11.7077 17.0005 10.3686 16.998 9M6 20H14M10 16V20"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Mute;
