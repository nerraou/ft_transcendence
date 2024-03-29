import { useMutation, useQueryClient } from "@tanstack/react-query";

import baseQuery, { RequestError } from "@utils/baseQuery";
import toast from "react-hot-toast";

interface RemoveFriend {
  userId: number;
  token: string | unknown;
}

async function removeFriend(user: RemoveFriend) {
  const api =
    process.env.NEXT_PUBLIC_API_BASE_URL + `/users/${user.userId}/unfriend`;

  return await baseQuery(api, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "content-type": "application/json",
    },
  });
}

function useRemoveFriendMutation() {
  const queryClient = useQueryClient();

  return useMutation<Response, RequestError, RemoveFriend>({
    mutationFn: removeFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["chatContact"] });
      queryClient.invalidateQueries({ queryKey: ["chatFriends"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Success");
    },
    onError: () => {
      toast.error("Error");
    },
  });
}

export default useRemoveFriendMutation;
