import clsx from "clsx";

interface CheckProps {
  width?: string;
  height?: string;
  color?: string;
}

function Check(props: CheckProps) {
  const { color = "stroke-light-bg-tertiary" } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="19"
      viewBox="0 0 27 19"
      fill="none"
      className={clsx(props.width, props.height, color)}
    >
      <path
        d="M1 9.33333L9.33333 17.6667L26 1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Check;
