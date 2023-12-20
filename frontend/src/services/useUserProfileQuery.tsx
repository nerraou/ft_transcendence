import { useSuspenseQuery } from "@tanstack/react-query";
import baseQuery from "@utils/baseQuery";

async function getUserHeader(token: string | unknown) {
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

export interface UserHeaderProps {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarPath: string;
  is2faEnabled: boolean;
  isEmailVerified: boolean;
  createdAt: string;
}

export function useUserProfileQuery(token: string | unknown) {
  return useSuspenseQuery<UserHeaderProps>({
    queryKey: ["user"],
    queryFn: () => {
      return getUserHeader(token);
    },
  });
}