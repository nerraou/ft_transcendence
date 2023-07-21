import UserMinusOutline from "@icons/outline/UserMinus";
import { MouseEvent } from "react";
import clsx from "clsx";

interface UserMinusProps {
  color: string;
  backgroundColor: string;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

function UserMinus(props: UserMinusProps) {
  return (
    <div
      className={clsx(
        props.backgroundColor,
        "w-8 h-8 rounded-lg inline-flex justify-center items-center",
      )}
      onClick={props.onClick}
    >
      <UserMinusOutline color={props.color} />
    </div>
  );
}

export default UserMinus;
