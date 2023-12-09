import { UserStatus } from "@components/molecules/FriendCard";

interface StatusProps {
  status?: UserStatus;
}

interface SignProps {
  color: string;
}

function Sign(props: SignProps) {
  return (
    <svg width="42" height="10" viewBox="0 0 42 10" className={props.color}>
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

function Status(props: StatusProps) {
  let color = "fill-light-fg-primary";

  if (props.status == "OFFLINE") {
    color = "fill-light-fg-secondary";
  } else if (props.status == "ONLINE") {
    color = "fill-light-bg-primary";
  }

  return (
    <>
      {props.status != "IN_GAME" && <Sign color={color} />}
      {props.status == "IN_GAME" && <InGameStatus />}
    </>
  );
}

export default Status;
