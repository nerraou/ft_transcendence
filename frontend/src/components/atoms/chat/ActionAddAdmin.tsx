import baseQuery, { RequestError } from "@utils/baseQuery";
import Admin from "../icons/outline/Admin";
import { useMutation } from "@tanstack/react-query";

interface ActionAddAdminProps {
  token: string | unknown;
  channelId: number;
  memberId: number;
}

interface AddAdmin {
  channelId: number;
  memberId: number;
  token: string | unknown;
}

async function addAdmin(member: AddAdmin) {
  const api = process.env.NEXT_PUBLIC_API_BASE_URL + "/channels/members/role";

  return await baseQuery(api, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${member.token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      channelId: member.channelId,
      memberId: member.memberId,
      role: "ADMIN",
    }),
  });
}

function ActionAddAdmin(props: ActionAddAdminProps) {
  const mutation = useMutation<Response, RequestError, AddAdmin>({
    mutationFn: addAdmin,
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
      <Admin
        color="stroke-light-fg-primary"
        hover="hover:bg-light-bg-tertiary"
      />
    </button>
  );
}

export default ActionAddAdmin;