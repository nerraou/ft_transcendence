import { UserStatus } from "@components/molecules/FriendCard";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import baseQuery, { RequestError } from "@utils/baseQuery";

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarPath: string;
  status: UserStatus;
  createdAt: number;
  ranking: number;
  isProfileOwner: boolean;
  rating: number;
  gamesStats: {
    wins: number;
    losses: number;
    winsPercentage: number;
    lossesPercentage: number;
  };
}

interface History {
  count: number;
  games: {
    id: number;
    player: {
      id: number;
      username: string;
      avatarPath: string;
      score: number;
    };
    opponent: {
      id: number;
      username: string;
      avatarPath: string;
      score: number;
    };
  }[];
}

export const useProfile = (token: string | unknown, username: string) => {
  const fetchHistory = async () => {
    const url =
      process.env.NEXT_PUBLIC_API_BASE_URL +
      `/users/${username}/games?page=1&limit=4`;

    const res = await baseQuery(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    });

    const response = res.json();
    return response;
  };

  const fetchProfile = async () => {
    const url =
      process.env.NEXT_PUBLIC_API_BASE_URL +
      `/users/profile/${username}?include_stats=true`;

    const res = await baseQuery(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    });
    const response = res.json();
    return response;
  };

  const {
    data: user,
    isLoading: profileLoading,
    isError: profileError,
  } = useSuspenseQuery<User | null>({
    queryKey: ["profile", username],
    queryFn: fetchProfile,
  });

  const {
    data: history,
    isLoading: historyLoading,
    isError: historyError,
  } = useSuspenseQuery<History>({
    queryKey: ["history", username],
    queryFn: fetchHistory,
  });

  const data = { user, history };
  const isLoading = profileLoading || historyLoading;
  const isError = profileError || historyError;

  return {
    data,
    isLoading,
    isError,
  };
};

// blockUser

interface BlockUserProps {
  token: string | unknown;
  id: number;
}
async function blockUser(token: string | unknown, id: number) {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + `/users/${id}/block`;

  const res = await baseQuery(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  const response = await res.json();
  return response;
}

export function useBlockUser(token: string | unknown, id: number) {
  return useMutation<Response, RequestError, BlockUserProps>({
    mutationFn: () => blockUser(token, id),
  });
}
