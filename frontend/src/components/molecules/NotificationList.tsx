"use client";

import { useEffect } from "react";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import baseQuery, { RequestError } from "@utils/baseQuery";
import { useInView } from "react-intersection-observer";

import Loading from "@icons/outline/Loading";
import NotificationCard, {
  NotificationCardProps,
} from "@atoms/NotificationCard";
import useAcceptFriendRequestMutation from "@services/useAcceptFriendRequestMutation";
import useDeclineFriendRequestMutation from "@services/useDeclineFriendRequestMutation";
import toast from "react-hot-toast";
import useAcceptChannelInvitationMutation from "@services/useAcceptChannelInvitationMutation";

interface Notification {
  id: number;
  userId: number;
  metadata: NotificationCardProps;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

interface NotificationResponse {
  count: number;
  nextPage: number | null;
  notifications: Notification[];
}

interface NotificatinListParams {
  jwt: string | unknown;
}

async function getNotifications(page: number, jwt: string | unknown) {
  const limit = 10;
  const url =
    process.env.NEXT_PUBLIC_API_BASE_URL +
    `/notifications?limit=${limit}&page=${page}`;

  const res = await baseQuery(url, {
    headers: { Authorization: `Bearer ${jwt}` },
  });

  const response = await res.json();

  let nextPage: number | null = page + 1;
  if (response.notifications.length == 0) {
    nextPage = null;
  }

  return { ...response, nextPage: nextPage };
}

export default function NotificatinList(params: NotificatinListParams) {
  const { ref, inView } = useInView();

  const acceptFriendMutation = useAcceptFriendRequestMutation();
  const declineFriendMutation = useDeclineFriendRequestMutation();
  const acceptChannelInvitationMutation = useAcceptChannelInvitationMutation();

  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery<
    NotificationResponse,
    RequestError
  >({
    queryKey: ["notifications"],
    queryFn({ pageParam }) {
      return getNotifications(pageParam as number, params.jwt);
    },
    initialPageParam: 1,
    getNextPageParam: (page) => {
      return page.nextPage ?? undefined;
    },
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  useEffect(() => {
    if (
      acceptFriendMutation.isSuccess ||
      declineFriendMutation.isSuccess ||
      acceptChannelInvitationMutation.isSuccess
    ) {
      toast.success("Success");
    }
  }, [
    acceptFriendMutation.isSuccess,
    declineFriendMutation.isSuccess,
    acceptChannelInvitationMutation.isSuccess,
  ]);

  useEffect(() => {
    if (acceptFriendMutation.isError) {
      toast.error("Cannot accept request");
    }
  }, [acceptFriendMutation.isError]);

  useEffect(() => {
    if (acceptChannelInvitationMutation.isError) {
      toast.error("Failed to join channel");
    }
  }, [acceptChannelInvitationMutation.isError]);

  return (
    <section
      dir="rtl"
      className="h-96 overflow-auto pl-4 scrollbar-thin scrollbar-thumb-dark-bg-primary"
    >
      <div dir="ltr" className="flex flex-col space-y-4">
        {data?.pages.map((page) => {
          return page.notifications.map((notification) => {
            if (notification.metadata.type == "contact") {
              const metadata = notification.metadata;

              return (
                <NotificationCard
                  key={notification.id}
                  {...notification.metadata}
                  isPending={
                    acceptFriendMutation.isPending ||
                    declineFriendMutation.isPending
                  }
                  onAccept={() => {
                    acceptFriendMutation.mutate({
                      contactId: metadata.id,
                      token: params.jwt,
                    });
                  }}
                  onDecline={() => {
                    declineFriendMutation.mutate({
                      contactId: metadata.id,
                      token: params.jwt,
                    });
                  }}
                />
              );
            }

            if (notification.metadata.type == "message") {
              return (
                <NotificationCard
                  key={notification.id}
                  {...notification.metadata}
                />
              );
            }

            if (notification.metadata.type == "channel-invitation") {
              const metadata = notification.metadata;

              return (
                <NotificationCard
                  key={notification.id}
                  {...notification.metadata}
                  isPending={acceptChannelInvitationMutation.isPending}
                  onJoin={() => {
                    acceptChannelInvitationMutation.mutate({
                      invitationToken: metadata.token,
                      token: params.jwt,
                    });
                  }}
                />
              );
            }
          });
        })}
      </div>
      {hasNextPage && (
        <div className="flex justify-center" ref={ref}>
          <Loading height="h-5" width="w-5" />
        </div>
      )}
    </section>
  );
}
