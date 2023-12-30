import clsx from "clsx";
import Image from "next/image";

export interface UserProps {
  id?: number;
  status: "ONLINE" | "OFFLINE" | "IN_GAME";
  username: string;
  avatarPath: string;
}

function User(props: UserProps) {
  let statusColor = "bg-light-fg-secondary";
  if (props.status == "ONLINE" || props.status == "IN_GAME") {
    statusColor = " bg-light-bg-primary";
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="relative shrink-0 w-16 h-16">
        <Image
          src={props.avatarPath}
          alt="user image"
          fill
          sizes="w-16 h-16"
          className="rounded-full object-cover appearance-none"
        />
        <div
          className={clsx(
            statusColor,
            "w-3 h-3 rounded-full absolute top-1 left-1",
          )}
        ></div>
      </div>
      <p className="text-dark-fg-primary text-base">{props.username}</p>
    </div>
  );
}

export default User;
