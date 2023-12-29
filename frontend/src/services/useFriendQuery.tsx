import { useSuspenseQuery } from "@tanstack/react-query";
import baseQuery from "@utils/baseQuery";

async function getUserHeader(token: string | unknown, username: string) {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + `/users/${username}`;

  const res = await baseQuery(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  });
  const response = res.json();
  return response;
}

// "id": 1,
// "username": null,
// "email": "jdoe@example.com",
// "firstName": null,
// "lastName": null,
// "avatarPath": "7e3b2ca3-cb75-4857-b0d4-66174f1b9a32.png",
// "status": "ONLINE | OFFLINE | IN_GAME",
// "createdAt": 1692017290161,
// "ranking": 2,
// "isProfileOwner": true,
// "gamesStats": {
//   "wins": 1,
//   "losses": 5,
//   "winsPercentage": 16.666666666666668,
//   "lossesPercentage": 83.33333333333333

export interface UserHeaderProps {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarPath: string;
  status: "ONLINE | OFFLINE | IN_GAME";
  createdAt: string;
}

export function useFriendQuery(token: string | unknown, username: string) {
  return useSuspenseQuery<UserHeaderProps>({
    queryKey: ["friend"],
    queryFn: () => {
      return getUserHeader(token, username);
    },
  });
}
