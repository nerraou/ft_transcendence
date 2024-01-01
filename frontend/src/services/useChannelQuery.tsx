import { useSuspenseQuery } from "@tanstack/react-query";
import baseQuery from "@utils/baseQuery";

async function getChannel(token: string | unknown, id: number) {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + `/channels/${id}/members`;

  const res = await baseQuery(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const response = res.json();
  return response;
}

interface Member {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  avatarPath: string;
  rating: number;
}

export interface MembersData {
  id: number;
  memberId: number;
  channelId: number;
  member: Member;
}

export function useChannelQuery(token: string | unknown, id: number) {
  return useSuspenseQuery<{ members: MembersData[] }>({
    queryKey: ["members", id],
    queryFn: () => {
      return getChannel(token, id);
    },
  });
}
