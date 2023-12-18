"use client";

import Layout from "@templates/Layout";

import React from "react";
import { useSession } from "next-auth/react";
import Loading from "@components/atoms/icons/outline/Loading";
import LoadingPage from "../loading";
import baseQuery from "@utils/baseQuery";
import {
  useSuspenseInfiniteQuery,
  QueryErrorResetBoundary,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { Fragment, Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useInView } from "react-intersection-observer";

import Post, { PostData } from "@components/molecules/feed/Post";
import Ranking, { RankingProps, User } from "@components/molecules/feed/Ranking";
import Communities, {
  Channel,
  CommunitiesProps,
} from "@components/molecules/feed/Communities";
import CreatePost from "@components/molecules/feed/CreatePost";
import clsx from "clsx";


interface FullPostData extends PostData {
  likedBy: number[];
}

const mockedPosts: FullPostData[] = [
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar: "/default/user-circle.png",
      },
      content: "This is fun.",
      likes: 10,
      image: "/default/user-circle.png",
      likedBy: [],
    },
    {
      id: 2,
      user: {
        name: "John Doe",
        avatar: "/default/user-circle.png",
      },
      content: "This is fun.",
      likes: 11,
      likedBy: [1, 2],
    },
  ]

interface FeedProps {
  posts: FullPostData[];
  ref: (node?: Element | null | undefined) => void;
  onLike: (id: number) => void;
}

// takes a list of posts and renders them and then puts the ref at the bottom
const Feed = (props: FeedProps) => {
  const { posts, ref } = props;
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onLike={props.onLike}
          liked={post.likedBy.includes(post.id)}
        />
      ))}
      <div ref={ref}></div>
    </div>
  );
};

interface RightSideProps {
  rankingProps: RankingProps;
  communitiesProps: CommunitiesProps;
}
const RightSide = ({ rankingProps, communitiesProps }: RightSideProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 w-1/3 lg:w-1/2 md:w-full sm:w-full ">
      <Ranking
        users={rankingProps.users}
        onViewMore={rankingProps.onViewMore}
      />
      <Communities
        channels={communitiesProps.channels}
        onJoin={communitiesProps.onJoin}
        query={communitiesProps.query}
        onSearchChange={communitiesProps.onSearchChange}
        onSearchClear={communitiesProps.onSearchClear}
      />
    </div>
  );
};

async function fetchPosts(page: number, token: string | unknown) {
  const limit = 10;
  const url =
    process.env.NEXT_PUBLIC_API_BASE_URL +
    `/posts?limit=${limit}&page=${page}`;

  const res = await baseQuery(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  let nextPage: number | null = page + 1;
  const response = await res.json();
  if (response.count == 0) {
    nextPage = null;
  }
  return { ...response, nextPage: nextPage };
}


async function fetchRanking(token: string | unknown) {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/users/ranking";

  const res = await baseQuery(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch ranking");
  }

  const response = await res.json();
  return response;
}

async function fetchCommunities(token: string | unknown) {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/channels";

  const res = await baseQuery(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch communities");
  }

  const response = await res.json();
  return response;
}

interface UserProps {
  count: number;
  posts: User[];
  nextPage: number;
}

interface ChannelProps {
  count: number;
  channels: Channel[];
  nextPage: number;
}


function FeedPage() {
  const { data: session, status } = useSession();

  const { ref, inView } = useInView();

  const { data: posts, isFetchingNextPage: isFetchingPostsNextPage, fetchNextPage: fetchNextPagePosts } =
    useSuspenseInfiniteQuery<UserProps>({
      queryKey: ["posts"],
      queryFn: ({ pageParam }) => {
        return fetchPosts(pageParam as number, session?.user.accessToken);
      },
      initialPageParam: 1,
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
    });

  const { data: ranking, isFetching: isFetchingRanking } =
    useSuspenseQuery<UserProps>({
      queryKey: ["ranking"],
      queryFn: () => {
        return fetchRanking(session?.user.accessToken);
      },
    });

  const { data: communities, isFetching: isFetchingCommunities } =
    useSuspenseQuery<ChannelProps>({
      queryKey: ["communities"],
      queryFn: () => {
        return fetchCommunities(session?.user.accessToken);
      },
    });
  
  useEffect(() => {
      if (inView) {
        fetchNextPagePosts();
      }
    }
  , [fetchNextPagePosts, inView]);

  return (
    <Layout>
      <div
    //   flip the order
        className={clsx(
          "flex flex-row justify-center items-start w-full gap-8 py-16 px-8",          
          "md:flex-col-reverse md:items-center md:gap-4",
          "sm:flex-col-reverse md:items-center"
        )}
      >
        <div className="flex flex-col items-center justify-center w-full gap-8 lg:w-3/4">
          <CreatePost
            onPost={(content) => {
              console.log("post");
            }}
          />
          <Feed
            // posts={data?.pages.flatMap((page) => page.posts) || []}
            posts={posts.pages || []}
            ref={ref}
            onLike={(id) => {
              console.log("like");
            }}
          />
          {/* {isFetchingNextPage && <Loading />} */}
        </div>
        <RightSide
          rankingProps={{
            users: [ranking?.users || []],
            onViewMore: () => {
              console.log("view more");
            },
          }}
          communitiesProps={{
            channels: [communities?.channels || []],
            onJoin: (id) => {
              console.log("join");
            },
            query: "",
            onSearchChange: (e) => {
              console.log("search change");
            },
            onSearchClear: () => {
              console.log("search clear");
            },
          }}
        />
      </div>
    </Layout>
  );
}

export default function SuspendedFeedPage() {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <QueryErrorResetBoundary>
          <Suspense fallback={<LoadingPage />}>
            <FeedPage />
          </Suspense>
        </QueryErrorResetBoundary>
      )}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      <Suspense fallback={<LoadingPage />}>
        <FeedPage />
      </Suspense>
    </ErrorBoundary>
  );
}
