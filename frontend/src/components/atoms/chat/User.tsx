import clsx from "clsx";
import Image from "next/image";

interface userProps {
  status: "ONLINE" | "OFFLINE";
  username: string;
  image: string;
}

function User(props: userProps) {
  let statusColor = "bg-light-fg-secondary";
  if (props.status == "ONLINE") {
    statusColor = " bg-light-bg-primary";
  }

  return (
    <div className="flex  items-center space-x-4">
      <div className="relative shrink-0 w-20 h-20">
        <Image
          src={props.image}
          alt="user image"
          fill
          sizes="w-20 h-20"
          className="rounded-full object-cover appearance-none"
        />
        <div
          className={clsx(
            statusColor,
            "w-3 h-3 rounded-full absolute top-1 left-1",
          )}
        ></div>
      </div>
      <p className="text-dark-fg-primary text-lg">{props.username}</p>
    </div>
  );
}

export default User;
