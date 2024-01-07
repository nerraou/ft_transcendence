import baseQuery, { RequestError } from "@utils/baseQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Ban from "../icons/outline/Ban";
import toast from "react-hot-toast";

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

async function banMember(member: BanMember) {
  const api = process.env.NEXT_PUBLIC_API_BASE_URL + "/channels/members/ban";

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

function ActionBanMember(props: ActionBanMemberProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation<Response, RequestError, BanMember>({
    mutationFn: banMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({ queryKey: ["chatChannels"] });
      toast.success("Success");
    },
    onError: () => {
      toast.error("Error");
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
