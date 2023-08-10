import clsx from "clsx";

interface BarStatusProps {
  width: string;
  status?: "online" | "offline";
  reverse?: boolean;
  marginY?: string;
  marginX?: string;
}

interface statusProps {
  color: string;
  animation?: string;
}

function Status(props: statusProps) {
  return (
    <svg
      width="42"
      height="10"
      viewBox="0 0 42 10"
      fill="none"
      className={clsx(props.color, props.animation)}
    >
      <rect width="5" height="10" rx="2.5" transform="matrix(-1 0 0 1 5 0)" />
      <rect width="5" height="10" rx="2.5" transform="matrix(-1 0 0 1 14 0)" />
      <rect width="5" height="10" rx="2.5" transform="matrix(-1 0 0 1 23 0)" />
      <rect width="5" height="10" rx="2.5" transform="matrix(-1 0 0 1 32 0)" />
      <rect width="5" height="10" rx="2.5" transform="matrix(-1 0 0 1 41 0)" />
    </svg>
  );
}

function BarStatus(props: BarStatusProps) {
  let color = "fill-light-fg-primary";
  let animation;

  if (props.status == "offline") {
    color = "fill-light-fg-secondary";
    animation = "animate-pulse";
  } else if (props.status == "online") {
    color = "fill-light-bg-primary";
    animation = "animate-pulse";
  }

  return (
    <div
      className={clsx("flex justify-between", props.marginX, props.marginY, {
        "flex-row-reverse": props.reverse,
      })}
    >
      <div
        className={clsx("bg-light-fg-primary rounded-full h-3", props.width)}
      />
      <Status color={color} animation={animation} />
    </div>
  );
}

export default BarStatus;
