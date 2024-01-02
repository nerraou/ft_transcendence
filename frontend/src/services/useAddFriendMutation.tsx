import { useMutation } from "@tanstack/react-query";

import baseQuery, { RequestError } from "@utils/baseQuery";

interface AddFriend {
  userId: number;
  token: string | unknown;
}

async function AddFriend(userId: number, token: string | unknown) {
  const api = process.env.NEXT_PUBLIC_API_BASE_URL + "/contacts";

  return await baseQuery(api, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ userId: userId }),
  });
}

function useAddFriendMutation(token: string | unknown, userId: number) {
  return useMutation<Response, RequestError, AddFriend>({
    mutationFn: () => {
      return AddFriend(userId, token);
    },
  });
}

export default useAddFriendMutation;
