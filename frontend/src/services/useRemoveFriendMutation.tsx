import { useMutation } from "@tanstack/react-query";

import baseQuery, { RequestError } from "@utils/baseQuery";

interface RemoveFriend {
  userId: number;
  token: string | unknown;
}

async function removeFriend(userId: number, token: string | unknown) {
  const api =
    process.env.NEXT_PUBLIC_API_BASE_URL + `/users/${userId}/unfriend`;

  return await baseQuery(api, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });
}

function useRemoveFriendMutation(token: string | unknown, userId: number) {
  return useMutation<Response, RequestError, RemoveFriend>({
    mutationFn: () => {
      return removeFriend(userId, token);
    },
  });
}

export default useRemoveFriendMutation;
