import ActionAddAdmin from "@components/atoms/chat/ActionAddAdmin";
import ActionBanMember from "@components/atoms/chat/ActionBanMember";
import ActionChallengeMember from "@components/atoms/chat/ActionChallengeMember";
import ActionKickMember from "@components/atoms/chat/ActionKickMember";
import ActionMuteMember from "@components/atoms/chat/ActionMuteMember";
import { MembersData } from "@services/useChannelQuery";
import Image from "next/image";
interface ActionsOwnerProps {
  members: MembersData[];
  token: string | unknown;
  profileOwnerId: number;
}

interface OwnerProps {
  profileOwnerId: number;
  channelId: number;
  memberId: number;
  imagePath: string;
  username: string;
  role: "MEMBER" | "OWNER" | "ADMIN";
  token: string | unknown;
}

function Owner(props: OwnerProps) {
  const imageUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/assets/images/";
  const isMe = props.profileOwnerId == props.memberId;

  return (
    <div className="flex flex-col items-center hover:bg-light-fg-tertiary border-2 rounded-md border-dark-fg-primary p-2 space-y-4">
      <label className="block self-start bg-dark-bg-primary text-light-fg-tertiary w-24 p-2">
        {props.role}
      </label>
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
        {!isMe && (
          <ActionMuteMember
            channelId={props.channelId}
            memberId={props.memberId}
            token={props.token}
          />
        )}
        {!isMe && <ActionChallengeMember username={props.username} />}

        {!isMe && (
          <ActionBanMember
            channelId={props.channelId}
            memberId={props.memberId}
            token={props.token}
          />
        )}

        {!isMe && (
          <ActionKickMember
            channelId={props.channelId}
            memberId={props.memberId}
            token={props.token}
          />
        )}
        {!isMe && (
          <ActionAddAdmin
            channelId={props.channelId}
            memberId={props.memberId}
            token={props.token}
          />
        )}
      </div>
    </div>
  );
}

function ActionsOwner(props: ActionsOwnerProps) {
  return (
    <div className="space-y-6">
      {props.members.map((member) => {
        return (
          <Owner
            profileOwnerId={props.profileOwnerId}
            key={member.memberId}
            channelId={member.channelId}
            memberId={member.memberId}
            imagePath={member.member.avatarPath}
            username={member.member.username}
            role={member.role}
            token={props.token}
          />
        );
      })}
    </div>
  );
}

export default ActionsOwner;
