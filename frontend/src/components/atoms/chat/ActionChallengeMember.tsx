import Link from "next/link";
import DeviceGamePad from "../icons/outline/DeviceGamePad";

interface ActionChallengeMemberProps {
  username: string;
}

function ActionChallengeMember(props: ActionChallengeMemberProps) {
  return (
    <Link href={`game/make?username=${props.username}`}>
      <DeviceGamePad
        color="stroke-light-fg-primary"
        hover="hover:bg-light-bg-tertiary"
      />
    </Link>
  );
}

export default ActionChallengeMember;
