import { useMutation, useQueryClient } from "@tanstack/react-query";

import baseQuery, { RequestError } from "@utils/baseQuery";

interface AcceptFriend {
  contactId: number;
  token: string | unknown;
}

async function acceptFriend(data: AcceptFriend) {
  const api =
    process.env.NEXT_PUBLIC_API_BASE_URL + `/contacts/${data.contactId}/accept`;

  return await baseQuery(api, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${data.token}`,
      "content-type": "application/json",
    },
  });
}

export default function useAcceptFriendRequestMutation() {
  const queryClient = useQueryClient();

  return useMutation<Response, RequestError, AcceptFriend>({
    mutationFn: acceptFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });
}
