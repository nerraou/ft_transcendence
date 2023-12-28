import clsx from "clsx";

interface MoonProps {
  className?: string;
  color?: string;
}

export default function Moon(props: MoonProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={clsx(props.className, props.color)}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z"
        strokeWidth="0"
        fill={props.color}
      />
    </svg>
  );
}
