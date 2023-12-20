import Status from "@atoms/Status";
import { UserStatus } from "@molecules/FriendCard";

interface BarStatusProps {
  status?: UserStatus;
}

function BarStatus(props: BarStatusProps) {
  return (
    <div className="flex justify-between mx-12 my-base">
      <div className="bg-light-fg-primary rounded-full h-3 w-2/3" />
      <Status status={props.status} />
    </div>
  );
}

export default BarStatus;
