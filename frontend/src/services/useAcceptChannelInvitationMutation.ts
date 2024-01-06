import { useMutation, useQueryClient } from "@tanstack/react-query";

import baseQuery, { RequestError } from "@utils/baseQuery";

interface AcceptChannelInvitation {
  invitationToken: string;
  token: string | unknown;
}

async function acceptChannelInvitation(data: AcceptChannelInvitation) {
  const api =
    process.env.NEXT_PUBLIC_API_BASE_URL + "/channels/invitations/accept";

  return await baseQuery(api, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${data.token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      token: data.invitationToken,
    }),
  });
}

export default function useAcceptChannelInvitationMutation() {
  const queryClient = useQueryClient();

  return useMutation<Response, RequestError, AcceptChannelInvitation>({
    mutationFn: acceptChannelInvitation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["channels"] });
    },
  });
}
