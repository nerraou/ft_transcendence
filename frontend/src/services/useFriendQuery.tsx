import { useSuspenseQuery } from "@tanstack/react-query";
import baseQuery from "@utils/baseQuery";

async function getUserHeader(token: string | unknown, username: string) {
  const url =
    process.env.NEXT_PUBLIC_API_BASE_URL + `/users/profile/${username}`;

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
  isBlocked: boolean;
  isFriend: boolean;
  isProfileOwner: boolean;
}

export function useFriendQuery(token: string | unknown, username: string) {
  return useSuspenseQuery<UserHeaderProps>({
    queryKey: ["chatContatct", username],
    queryFn: () => {
      return getUserHeader(token, username);
    },
  });
}
