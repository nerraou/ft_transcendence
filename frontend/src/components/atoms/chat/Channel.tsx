import clsx from "clsx";
import Image from "next/image";
interface ChannelProps {
  id?: number;
  name: string;
  imagePath: string;
  description?: string;
  membersCount?: number;
  type?: "PUBLIC";
}

function Channel(props: ChannelProps) {
  let members = "members";
  if (props.membersCount === 1) {
    members = "member";
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="relative shrink-0 w-16 h-16">
        <Image
          src={props.imagePath}
          alt="user image"
          fill
          sizes="w-16 h-16"
          className="rounded-sm object-cover appearance-none"
        />
      </div>
      <div>
        <p className="text-light-fg-primary text-base">#{props.name}</p>
        {props.membersCount && (
          <p className="text-light-fg-link text-sm">
            {clsx(props.membersCount, members)}
          </p>
        )}
        {props.description && (
          <p className="text-light-fg-link text-base">{props.description}</p>
        )}
      </div>
    </div>
  );
}

export default Channel;
