import { MembersData } from "@services/useChannelQuery";

interface ActionsMemberProps {
  members: MembersData[];
  token: string | unknown;
}

function ActionsMember(props: ActionsMemberProps) {
  return (
    <div>
      {props.members.map((member) => {
        return <li key={member.memberId}>{member.member.username}</li>;
      })}
    </div>
  );
}

export default ActionsMember;
