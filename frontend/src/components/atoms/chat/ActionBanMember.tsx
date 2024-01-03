import baseQuery, { RequestError } from "@utils/baseQuery";
import { useMutation } from "@tanstack/react-query";
import Ban from "../icons/outline/Ban";

interface ActionBanMemberProps {
  token: string | unknown;
  channelId: number;
  memberId: number;
}

interface BanMember {
  channelId: number;
  memberId: number;
  token: string | unknown;
}

async function banMember(
  channelId: number,
  memberId: number,
  token: string | unknown,
) {
  const api = process.env.NEXT_PUBLIC_API_BASE_URL + "/channels/members/ban";

  return await baseQuery(api, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      channelId: channelId,
      memberId: memberId,
    }),
  });
}

function ActionBanMember(props: ActionBanMemberProps) {
  const mutation = useMutation<Response, RequestError, BanMember>({
    mutationFn: () => {
      return banMember(props.channelId, props.memberId, props.token);
    },
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
      <Ban color="stroke-light-fg-primary" hover="hover:bg-light-bg-tertiary" />
    </button>
  );
}

export default ActionBanMember;
