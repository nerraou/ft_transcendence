interface SelectorProps {
  className?: string;
}

function Selector({ className }: SelectorProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M8 9l4 -4l4 4"></path>
      <path d="M16 15l-4 4l-4 -4"></path>
    </svg>
  );
}

export default Selector;
