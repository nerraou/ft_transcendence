import { MouseEvent } from "react";
import clsx from "clsx";
import UserCheckOutline from "@icons/outline/UserCheck";

interface UserCheckProps {
  color: string;
  backgroundColor: string;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

function UserCheck(props: UserCheckProps) {
  return (
    <div
      className={clsx(
        props.backgroundColor,
        "w-8 h-8 rounded-lg inline-flex justify-center items-center",
      )}
      onClick={props.onClick}
    >
      <UserCheckOutline color={props.color} />
    </div>
  );
}

export default UserCheck;
