import ActionChallengeMember from "@components/atoms/chat/ActionChallengeMember";
import { MembersData } from "@services/useChannelQuery";
import Image from "next/image";

interface ActionsMemberProps {
  members: MembersData[];
  token: string | unknown;
  profileOwnerId: number;
}

interface MemberProps {
  memberId: number;
  imagePath: string;
  username: string;
  token: string | unknown;
  profileOwnerId: number;
  role: "MEMBER" | "OWNER" | "ADMIN";
}

function Member(props: MemberProps) {
  const imageUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/assets/images/";
  const isMe = props.profileOwnerId == props.memberId;

  return (
    <div className="flex items-center hover:bg-light-fg-tertiary p-4 space-x-4">
      <label className="block self-start bg-dark-bg-primary text-light-fg-tertiary w-24 p-2">
        {props.role}
      </label>

      <div className="flex justify-start items-center space-x-6">
        <div className="flex flex-col justify-center items-center space-x-2">
          <div className="relative shrink-0 w-16 h-16">
            <Image
              src={imageUrl + props.imagePath}
              alt="user image"
              fill
              sizes="w-16 h-16"
              className="rounded-sm object-cover appearance-none"
            />
          </div>

          <p className="block text-light-fg-link text-lg">{props.username}</p>
        </div>

        {!isMe && <ActionChallengeMember username={props.username} />}
      </div>
    </div>
  );
}

function ActionsMember(props: ActionsMemberProps) {
  return (
    <div className="flex flex-col space-y-4">
      {props.members.map((member) => {
        return (
          <Member
            role={member.role}
            key={member.memberId}
            memberId={member.memberId}
            imagePath={member.member.avatarPath}
            username={member.member.username}
            token={props.token}
            profileOwnerId={props.profileOwnerId}
          />
        );
      })}
    </div>
  );
}

export default ActionsMember;
