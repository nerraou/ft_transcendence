interface ChevronUpProps {
  className?: string;
}
function ChevronUp({ className }: ChevronUpProps) {
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
      <path d="M6 15l6 -6l6 6"></path>
    </svg>
  );
}

export default ChevronUp;
