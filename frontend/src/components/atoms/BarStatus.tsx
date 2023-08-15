import clsx from "clsx";
import { UserStatus } from "@molecules/profile/UserHeader";

interface BarStatusProps {
  width: string;
  status?: UserStatus;
  reverse?: boolean;
  marginY?: string;
  marginX?: string;
}

interface StatusProps {
  color: string;
}

function Status(props: StatusProps) {
  return (
    <svg
      width="42"
      height="10"
      viewBox="0 0 42 10"
      fill="none"
      className={props.color}
    >
      <rect width="5" height="10" rx="2.5" transform="matrix(-1 0 0 1 5 0)" />
      <rect width="5" height="10" rx="2.5" transform="matrix(-1 0 0 1 14 0)" />
      <rect width="5" height="10" rx="2.5" transform="matrix(-1 0 0 1 23 0)" />
      <rect width="5" height="10" rx="2.5" transform="matrix(-1 0 0 1 32 0)" />
      <rect width="5" height="10" rx="2.5" transform="matrix(-1 0 0 1 41 0)" />
    </svg>
  );
}

function InGameStatus() {
  return (
    <div className="relative flex justify-between h-3 w-12" title="playing...">
      <div className="w-1.5 h-full rounded-full bg-dark-fg-secondary" />
      <div className="w-1.5 h-1.5 absolute -translate-y-1/2 top-1/2 rounded-full animate-ping-pong bg-light-fg-tertiary" />
      <div className="w-1.5 h-full rounded-full bg-light-bg-primary" />
    </div>
  );
}

function BarStatus(props: BarStatusProps) {
  let color = "fill-light-fg-primary";

  if (props.status == "offline") {
    color = "fill-light-fg-secondary";
  } else if (props.status == "online") {
    color = "fill-light-bg-primary";
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
      {props.status != "in-game" && <Status color={color} />}

      {props.status == "in-game" && <InGameStatus />}
    </div>
  );
}

export default BarStatus;
