import { useSuspenseQuery } from "@tanstack/react-query";
import baseQuery from "@utils/baseQuery";

async function getChannel(token: string | unknown, id: number) {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + `/channel/${id}`;

  const res = await baseQuery(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const response = res.json();
  return response;
}

export interface UserHeaderProps {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarPath: string;
  status: "ONLINE" | "OFFLINE" | "IN_GAME";
  createdAt: string;
}

export function useFriendQuery(token: string | unknown, id: number) {
  return useSuspenseQuery<UserHeaderProps>({
    queryKey: ["friend"],
    queryFn: () => {
      return getChannel(token, id);
    },
  });
}
