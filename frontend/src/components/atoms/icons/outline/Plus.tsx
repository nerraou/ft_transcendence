interface PlusProps {
  className?: string;
}

function Plus({ className }: PlusProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
    >
      <path
        d="M7.69922 10.5H13.6992M10.6992 7.5V13.5M1.69922 3.5C1.69922 2.96957 1.90993 2.46086 2.28501 2.08579C2.66008 1.71071 3.16879 1.5 3.69922 1.5H17.6992C18.2297 1.5 18.7384 1.71071 19.1134 2.08579C19.4885 2.46086 19.6992 2.96957 19.6992 3.5V17.5C19.6992 18.0304 19.4885 18.5391 19.1134 18.9142C18.7384 19.2893 18.2297 19.5 17.6992 19.5H3.69922C3.16879 19.5 2.66008 19.2893 2.28501 18.9142C1.90993 18.5391 1.69922 18.0304 1.69922 17.5V3.5Z"
        stroke="#F4C127"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Plus;
