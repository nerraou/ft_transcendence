import Ban from "@components/atoms/icons/outline/Ban";
import DeviceGamePad from "@components/atoms/icons/outline/DeviceGamePad";
import Kick from "@components/atoms/icons/outline/Kick";
import Mute from "@components/atoms/icons/outline/Mute";
import { MembersData } from "@services/useChannelQuery";
import Image from "next/image";
interface ActionsAdminProps {
  members: MembersData[];
  token: string | unknown;
}

interface AdminProps {
  imagePath: string;
  username: string;
  token: string | unknown;
}

function Admin(props: AdminProps) {
  const imageUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/assets/images/";

  return (
    <div className="flex flex-col items-center hover:bg-light-fg-tertiary border-2 rounded-md border-dark-fg-primary p-2 space-y-4">
      <div className="flex flex-col justify-center items-center">
        <div className="relative shrink-0 w-16 h-16">
          <Image
            src={imageUrl + props.imagePath}
            alt="user image"
            fill
            sizes="w-16 h-16"
            className="rounded-full object-cover appearance-none"
          />
        </div>

        <p className="text-dark-fg-primary text-lg">{props.username}</p>
      </div>
      <div className="flex space-x-5">
        <DeviceGamePad
          color="stroke-light-fg-primary"
          hover="hover:bg-light-bg-tertiary"
        />
        <Ban
          color="stroke-light-fg-primary"
          hover="hover:bg-light-bg-tertiary"
        />
        <Kick
          color="stroke-light-fg-primary"
          hover="hover:bg-light-bg-tertiary"
        />
        <Mute
          color="stroke-light-fg-primary"
          hover="hover:bg-light-bg-tertiary"
        />
      </div>
    </div>
  );
}

function ActionsAdmin(props: ActionsAdminProps) {
  return (
    <div className="space-y-6">
      {props.members.map((member) => {
        return (
          <Admin
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

export default ActionsAdmin;
