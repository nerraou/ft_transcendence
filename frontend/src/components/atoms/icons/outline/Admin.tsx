import { MouseEvent } from "react";

interface AdminProps {
  color: string;
  onClick?: (event: MouseEvent<SVGSVGElement>) => void;
}

function Admin(props: AdminProps) {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      className={props.color}
      onClick={props.onClick}
      fill="none"
    >
      <path
        d="M10.4491 18.87C10.2961 18.917 10.1421 18.96 9.98714 19C8.43035 18.5962 6.97062 17.8836 5.69468 16.9045C4.41875 15.9254 3.35265 14.6998 2.55973 13.3005C1.76682 11.9013 1.26327 10.3569 1.07901 8.75918C0.894756 7.16147 1.03355 5.54302 1.48714 4C4.60267 4.14257 7.65131 3.06658 9.98714 1C12.323 3.06658 15.3716 4.14257 18.4871 4C19.0971 6.07464 19.1351 8.27554 18.5971 10.37M13.9871 17H19.9871M16.9871 14V20"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Admin;
