"use client";

import { useSession } from "next-auth/react";

import InputSearch from "@atoms/InputSearch";
import FriendCard from "@molecules/FriendCard";
import Layout from "@templates/Layout";
import { UserStatus } from "@molecules/FriendCard";
import { useInView } from "react-intersection-observer";

import {
  useSuspenseInfiniteQuery,
  QueryErrorResetBoundary,
  useQueryClient,
} from "@tanstack/react-query";
import { Fragment, Suspense, useCallback, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

import Loading from "@components/atoms/icons/outline/Loading";
import Modal from "@components/atoms/Modal";
import Button from "@components/atoms/Button";
import { redirect } from "next/navigation";
import LoadingPage from "../loading";
import baseQuery from "@utils/baseQuery";
import debounce from "lodash/debounce";

interface Friend {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarPath: string;
  status: UserStatus;
  ranking: number;
}

interface FriendProps {
  count: number;
  contacts: Friend[];
  nextPage: number;
}
interface FriendsListProps {
  token: string | unknown;
}

async function getFriends(
  page: number,
  token: string | unknown,
  query: string,
) {
  const limit = 10;
  const url =
    process.env.NEXT_PUBLIC_API_BASE_URL +
    `/contacts?limit=${limit}&page=${page}${
      query ? `&search_query=${query}` : ""
    }`;

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

function FriendsList(props: FriendsListProps) {
  const { ref, inView } = useInView();
  const imageUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/assets/images/";
  const [query, setQuery] = useState("");
  const [virtualQuery, setVirtualQuery] = useState("");
  const queryClient = useQueryClient();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetQuery = useCallback(
    debounce((q) => {
      queryClient.resetQueries({ queryKey: ["friends", query] });
      setQuery(q);
    }, 1000),
    [],
  );

  const { data, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery<FriendProps>({
      queryKey: ["friends", query],
      queryFn: ({ pageParam }) => {
        return getFriends(pageParam as number, props.token, query);
      },
      initialPageParam: 1,
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div className="flex flex-col justify-center py-16 sm:py-0 px-8 space-y-8">
      <div className="flex justify-end">
        <InputSearch
          value={virtualQuery}
          placeholder="Search"
          width="w-96 sm:w-60"
          onChange={(e) => {
            setVirtualQuery(e.target.value);
            debouncedSetQuery(e.target.value);
          }}
          onClear={() => {
            setVirtualQuery("");
            debouncedSetQuery("");
          }}
          textColor=""
        />
      </div>
      <div className="flex flex-col justify-center">
        <div className="grid grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-8 sm:px-8 ">
          {data?.pages?.map((page, key) => {
            return (
              <Fragment key={key}>
                {page.contacts?.map((value) => {
                  return (
                    <FriendCard
                      key={value.id}
                      id={value.id}
                      token={props.token}
                      fullname={value.firstName + " " + value.lastName}
                      image={imageUrl + value.avatarPath}
                      username={value.username}
                      userStatus={value.status}
                      level={value.ranking}
                    />
                  );
                })}
              </Fragment>
            );
          })}
        </div>
        <div className="inline-flex justify-center sm:mb-16 mt-8" ref={ref}>
          {isFetchingNextPage ? <Loading width="w-16" height="w-16" /> : null}
        </div>
      </div>
    </div>
  );
}

function FriendsPage() {
  const { data: session, status: sessionStatus } = useSession();

  if (sessionStatus === "unauthenticated") {
    redirect("/sign-in");
  }

  if (sessionStatus === "loading") {
    return (
      <LoadingPage
        bgColor=" bg-light-bg-tertiary dark:bg-dark-bg-primary"
        width="w-screen"
        height="h-screen"
      />
    );
  }

  return (
    <Layout>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => (
              <Modal
                isOpen
                title="Error"
                description="Something went wrong"
                action={
                  <Button
                    text="Retry"
                    onClick={() => {
                      resetErrorBoundary();
                    }}
                  />
                }
              />
            )}
          >
            <Suspense fallback={<LoadingPage />}>
              <FriendsList token={session?.user.accessToken} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Layout>
  );
}
export default FriendsPage;
