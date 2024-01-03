import DeviceGamePad from "@components/atoms/icons/outline/DeviceGamePad";
import { MembersData } from "@services/useChannelQuery";
import Image from "next/image";

interface ActionsMemberProps {
  members: MembersData[];
  token: string | unknown;
}

interface MemberProps {
  imagePath: string;
  username: string;
  token: string | unknown;
}

function Member(props: MemberProps) {
  const imageUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/assets/images/";

  return (
    <div className="flex justify-between hover:bg-light-fg-tertiary p-2">
      <div className="flex space-x-2">
        <div className="relative shrink-0 w-16 h-16">
          <Image
            src={imageUrl + props.imagePath}
            alt="user image"
            fill
            sizes="w-16 h-16"
            className="rounded-sm object-cover appearance-none"
          />
        </div>

        <p className="text-light-fg-link text-lg">{props.username}</p>
      </div>
      <DeviceGamePad color="stroke-light-fg-primary" />
    </div>
  );
}

function ActionsMember(props: ActionsMemberProps) {
  return (
    <div className="space-y-4">
      {props.members.map((member) => {
        return (
          <Member
            key={member.memberId}
            imagePath={member.member.avatarPath}
            username={member.member.username}
            token={props.token}
          />
        );
      })}
    </div>
  );
}

export default ActionsMember;
