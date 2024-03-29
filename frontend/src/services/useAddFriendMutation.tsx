import { useMutation, useQueryClient } from "@tanstack/react-query";

import baseQuery, { RequestError } from "@utils/baseQuery";
import toast from "react-hot-toast";

interface AddFriend {
  userId: number;
  token: string | unknown;
}

async function addFriend(user: AddFriend) {
  const api = process.env.NEXT_PUBLIC_API_BASE_URL + "/contacts";

  return await baseQuery(api, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ userId: user.userId }),
  });
}

function useAddFriendMutation() {
  const queryClient = useQueryClient();

  return useMutation<Response, RequestError, AddFriend>({
    mutationFn: addFriend,
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

export default useAddFriendMutation;
