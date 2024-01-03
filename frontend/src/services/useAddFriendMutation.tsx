import { useMutation } from "@tanstack/react-query";

import baseQuery, { RequestError } from "@utils/baseQuery";

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
  return useMutation<Response, RequestError, AddFriend>({
    mutationFn: addFriend,
  });
}

export default useAddFriendMutation;
