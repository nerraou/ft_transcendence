import UserPlusOutline from "@icons/outline/UserPlus";
import { MouseEvent } from "react";
import clsx from "clsx";

interface UserPlusProps {
  color: string;
  backgroundColor: string;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

function UserPlus(props: UserPlusProps) {
  return (
    <div
      className={clsx(
        props.backgroundColor,
        "w-8 h-8 rounded-lg inline-flex justify-center items-center",
      )}
      onClick={props.onClick}
    >
      <UserPlusOutline color={props.color} />
    </div>
  );
}

export default UserPlus;
