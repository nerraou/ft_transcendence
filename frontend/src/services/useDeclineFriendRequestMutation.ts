import { useMutation, useQueryClient } from "@tanstack/react-query";

import baseQuery, { RequestError } from "@utils/baseQuery";

interface DeclineFriend {
  contactId: number;
  token: string | unknown;
}

async function declineFriend(data: DeclineFriend) {
  const api =
    process.env.NEXT_PUBLIC_API_BASE_URL +
    `/contacts/${data.contactId}/decline`;

  return await baseQuery(api, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${data.token}`,
      "content-type": "application/json",
    },
  });
}

export default function useDeclineFriendRequestMutation() {
  const queryClient = useQueryClient();

  return useMutation<Response, RequestError, DeclineFriend>({
    mutationFn: declineFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });
}
