import baseQuery, { RequestError } from "@utils/baseQuery";
import Admin from "../icons/outline/Admin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AddAdmin from "../icons/outline/AddAdmin";
import toast from "react-hot-toast";

interface ActionAddOrRemoveAdminProps {
  token: string | unknown;
  channelId: number;
  memberId: number;
  isAdmin: boolean;
}

interface AddOrRemoveAdmin {
  channelId: number;
  memberId: number;
  token: string | unknown;
  role: "MEMBER" | "OWNER" | "ADMIN";
}

async function addOrRemoveAdmin(member: AddOrRemoveAdmin) {
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
      role: member.role,
    }),
  });
}

function ActionAddOrRemoveAdmin(props: ActionAddOrRemoveAdminProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation<Response, RequestError, AddOrRemoveAdmin>({
    mutationFn: addOrRemoveAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      toast.success("Success");
    },
    onError: () => {
      toast.error("Error");
    },
  });

  return (
    <div>
      {props.isAdmin && (
        <button
          onClick={() => {
            return mutation.mutate({
              channelId: props.channelId,
              memberId: props.memberId,
              token: props.token,
              role: "MEMBER",
            });
          }}
          disabled={mutation.isPending}
        >
          <Admin />
        </button>
      )}

      {!props.isAdmin && (
        <button
          onClick={() => {
            return mutation.mutate({
              channelId: props.channelId,
              memberId: props.memberId,
              token: props.token,
              role: "ADMIN",
            });
          }}
          disabled={mutation.isPending}
        >
          <AddAdmin
            color="stroke-light-fg-primary"
            hover="hover:bg-light-bg-tertiary"
          />
        </button>
      )}
    </div>
  );
}

export default ActionAddOrRemoveAdmin;
