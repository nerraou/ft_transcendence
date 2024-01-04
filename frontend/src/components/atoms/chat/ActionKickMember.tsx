import baseQuery, { RequestError } from "@utils/baseQuery";
import { useMutation } from "@tanstack/react-query";
import Kick from "../icons/outline/Kick";

interface ActionKickMemberProps {
  token: string | unknown;
  channelId: number;
  memberId: number;
}

interface KickMember {
  channelId: number;
  memberId: number;
  token: string | unknown;
}

async function kickMember(member: KickMember) {
  const api = process.env.NEXT_PUBLIC_API_BASE_URL + "/channels/members/Kick";

  return await baseQuery(api, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${member.token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      channelId: member.channelId,
      memberId: member.memberId,
    }),
  });
}

function ActionKickMember(props: ActionKickMemberProps) {
  const mutation = useMutation<Response, RequestError, KickMember>({
    mutationFn: kickMember,
  });

  return (
    <button
      onClick={() => {
        return mutation.mutate({
          channelId: props.channelId,
          memberId: props.memberId,
          token: props.token,
        });
      }}
      disabled={mutation.isPending}
    >
      <Kick
        color="stroke-light-fg-primary"
        hover="hover:bg-light-bg-tertiary"
      />
    </button>
  );
}

export default ActionKickMember;
