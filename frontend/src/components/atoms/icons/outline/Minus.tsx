interface MinusProps {
  className?: string;
}

function Minus({ className }: MinusProps) {
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
        d="M7.09961 10.5H13.0996M1.09961 3.5C1.09961 2.96957 1.31032 2.46086 1.6854 2.08579C2.06047 1.71071 2.56918 1.5 3.09961 1.5H17.0996C17.63 1.5 18.1387 1.71071 18.5138 2.08579C18.8889 2.46086 19.0996 2.96957 19.0996 3.5V17.5C19.0996 18.0304 18.8889 18.5391 18.5138 18.9142C18.1387 19.2893 17.63 19.5 17.0996 19.5H3.09961C2.56918 19.5 2.06047 19.2893 1.6854 18.9142C1.31032 18.5391 1.09961 18.0304 1.09961 17.5V3.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Minus;
