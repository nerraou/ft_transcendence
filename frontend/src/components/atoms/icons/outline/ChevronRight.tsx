import clsx from "clsx";

interface ChevronRightProps {
  className?: string;
  color?: string;
}

function ChevronRight(props: ChevronRightProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(props.className, props.color)}
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
      <path d="M9 6l6 6l-6 6"></path>
    </svg>
  );
}

export default ChevronRight;
