import { useMutation } from "@tanstack/react-query";
import baseQuery, { RequestError } from "@utils/baseQuery";

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
  return useMutation<Response, RequestError, BlockUser>({
    mutationFn: blockUser,
  });
}
