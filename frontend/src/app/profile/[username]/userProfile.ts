import { UserStatus } from "@components/molecules/FriendCard";
import { useSuspenseQuery } from "@tanstack/react-query";
import baseQuery from "@utils/baseQuery";

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
  isFriend: boolean;
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
