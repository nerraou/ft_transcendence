import { useSuspenseQuery } from "@tanstack/react-query";
import baseQuery from "@utils/baseQuery";

async function getUser(token: string | unknown) {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/users/me";

  const res = await baseQuery(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  });
  const response = res.json();
  return response;
}

export interface UserProps {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarPath: string;
  is2faEnabled: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  ranking: number;
}

export function useUserProfileQuery(token: string | unknown) {
  return useSuspenseQuery<UserProps>({
    queryKey: ["user"],
    queryFn: () => {
      return getUser(token);
    },
  });
}
