"use client";

import { useSession } from "next-auth/react";

import InputSearch from "@atoms/InputSearch";
import FriendCard from "@molecules/FriendCard";
import Layout from "@templates/Layout";
import { UserStatus } from "@molecules/FriendCard";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import Loading from "@components/atoms/icons/outline/Loading";
import Modal from "@components/atoms/Modal";
import baseQuery from "@utils/baseQuery";
import Button from "@components/atoms/Button";
import { redirect } from "next/navigation";

interface Friend {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarPath: string;
  status: UserStatus;
}

interface FriendProps {
  count: number;
  contacts: Friend[];
  nextPage: number;
}

async function getFriends(page: number, token: string | unknown) {
  const limit = 20;
  const url =
    process.env.NEXT_PUBLIC_API_BASE_URL +
    `/contacts?limit=${limit}&page=${page}`;

  const res = await baseQuery(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  let nextPage: number | null = page + 1;
  const response = await res.json();
  if (response.count == 0) {
    nextPage = null;
  }
  return { ...response, nextPage: nextPage };
}

function FriendsPage() {
  const { data: session, status: sessionStatus } = useSession();
  const { ref, inView } = useInView();
  const imageUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/assets/images/";

  const { status, data, isFetchingNextPage, refetch, fetchNextPage } =
    useInfiniteQuery<FriendProps>({
      enabled: session?.user.accessToken ? true : false,
      queryKey: ["friend"],
      queryFn: ({ pageParam }) => {
        return getFriends(pageParam as number, session?.user.accessToken);
      },

      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (sessionStatus === "unauthenticated") {
    redirect("/sign-in");
  }

  if (sessionStatus === "loading") {
    return <p>Loading</p>;
  }

  return (
    <Layout>
      <div className="flex flex-col justify-center py-16 sm:py-0 px-8 space-y-8">
        <div className="flex justify-end">
          <InputSearch
            value="Search"
            placeholder="Search"
            width="w-96 sm:w-60"
            onChange={() => {
              return;
            }}
            onClear={() => {
              return;
            }}
            textColor=""
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-8  sm:px-8">
          {data?.pages?.map((page, key) => {
            return (
              <Fragment key={key}>
                {page.contacts?.map((value) => {
                  return (
                    <FriendCard
                      key={value.id}
                      fullname={value.firstName + " " + value.lastName}
                      image={imageUrl + value.avatarPath}
                      username={value.username}
                      userStatus={value.status}
                      level={3}
                    />
                  );
                })}
              </Fragment>
            );
          })}
        </div>
        <div className="inline-flex justify-center sm:mb-16" ref={ref}>
          {isFetchingNextPage ? <Loading width="w-16" height="w-16" /> : null}
        </div>
        {status === "error" ? (
          <Modal
            title="Error"
            description="Something went wrong"
            action={
              <Button
                text="Retry"
                onClick={() => {
                  refetch();
                }}
              />
            }
          />
        ) : null}
      </div>
    </Layout>
  );
}
export default FriendsPage;
