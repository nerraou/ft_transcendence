import { useMutation, useQueryClient } from "@tanstack/react-query";
import baseQuery, { RequestError } from "@utils/baseQuery";
import toast from "react-hot-toast";

interface BlockUser {
  token: string | unknown;
  id: number;
}
async function blockUser(user: BlockUser) {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + `/users/${user.id}/block`;

  const res = await baseQuery(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${user.token}` },
  });

  const response = await res.json();
  return response;
}

export function useBlockUserMutation() {
  const queryClient = useQueryClient();

  return useMutation<Response, RequestError, BlockUser>({
    mutationFn: blockUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["chatContact"] });
      queryClient.invalidateQueries({ queryKey: ["chatFriends"] });
      queryClient.invalidateQueries({ queryKey: ["chatChannels"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Success");
    },
    onError: () => {
      toast.error("Error");
    },
  });
}
