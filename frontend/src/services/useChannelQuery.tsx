import { useSuspenseQuery } from "@tanstack/react-query";
import baseQuery from "@utils/baseQuery";

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
  role: "MEMBER" | "OWNER" | "ADMIN";
  member: Member;
}

function compare(memberARole: MembersData, memberBRole: MembersData) {
  if (memberARole.role == memberBRole.role) {
    return 0;
  }
  if (memberARole.role == "OWNER") {
    return -1;
  }
  if (memberBRole.role == "OWNER") {
    return 1;
  }

  if (memberARole.role == "ADMIN") {
    return -1;
  }
  if (memberBRole.role == "ADMIN") {
    return 1;
  }
  return 0;
}

async function getChannel(token: string | unknown, id: number) {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + `/channels/${id}/members`;

  const res = await baseQuery(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await res.json();

  return { members: response.members.sort(compare) };
}

export function useChannelQuery(token: string | unknown, id: number) {
  return useSuspenseQuery<{ members: MembersData[] }>({
    queryKey: ["members", id],
    queryFn: () => {
      return getChannel(token, id);
    },
  });
}
