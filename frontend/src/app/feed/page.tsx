"use client";

import Layout from "@templates/Layout";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Loading from "@components/atoms/icons/outline/Loading";
import LoadingPage from "../loading";
import baseQuery from "@utils/baseQuery";
import {
  useSuspenseInfiniteQuery,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useInView } from "react-intersection-observer";

import Post from "@components/molecules/feed/Post";
import Ranking, { RankingProps } from "@components/molecules/feed/Ranking";
import Communities, {
  CommunitiesProps,
} from "@components/molecules/feed/Communities";
import CreatePost from "@components/molecules/feed/CreatePost";
import clsx from "clsx";
import Modal from "@components/atoms/Modal";
import Button from "@components/atoms/Button";

interface FullPostData {
  id: number;
  content: string | null;
  imagePath: string | null;
  likesCount: number;
  createdAt: string;
  likedByUser: boolean;
  owner: {
    id: number;
    username: string | null;
    avatarPath: string;
    firstName: string | null;
    lastName: string | null;
  };
}

interface FeedProps {
  posts: FullPostData[];
  ref: (node?: Element | null | undefined) => void;
  onLike: (id: number) => Promise<void>;
}

const Feed = (props: FeedProps) => {
  const imageUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/assets/images/";
  const { posts, ref } = props;
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      {posts.map((post) => (
        <Post
          key={post.id}
          post={{
            id: post.id,
            content: post.content,
            image: post.imagePath ? imageUrl + post.imagePath : null,
            user: {
              name: `${post.owner.firstName} ${post.owner.lastName}`,
              avatar: post.owner.avatarPath
                ? imageUrl + post.owner.avatarPath
                : null,
            },
            likes: post.likesCount,
            createdAt: post.createdAt,
          }}
          onLike={() => props.onLike(post.id)}
          liked={post.likedByUser}
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
    process.env.NEXT_PUBLIC_API_BASE_URL + `/posts?limit=${limit}&page=${page}`;

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

// a function that post a new post with content and image(string($binaray)) to the server
async function postPost(
  content: string,
  image: string,
  token: string | unknown,
) {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/posts";
  const res = await baseQuery(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ content: content, image: image }),
  });
  const response = await res.json();
  return response;
}

async function likePost(id: number, token: string | unknown) {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + `/posts/like/${id}`;
  return await baseQuery(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function fetchRanking(token: string | unknown) {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/users/ranking";

  const res = await baseQuery(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const response = await res.json();
  return response;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function fetchCommunities(token: string | unknown) {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/channels";

  const res = await baseQuery(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const response = await res.json();
  return response;
}

interface UserProps {
  count: number;
  posts: FullPostData[];
  nextPage: number;
}

function FeedPage() {
  const [query, setQuery] = useState("");

  const { data: session } = useSession();
  const { ref, inView } = useInView();

  const {
    data: postPages,
    isFetchingNextPage: isFetchingPostsNextPage,
    fetchNextPage: fetchNextPagePosts,
  } = useSuspenseInfiniteQuery<UserProps>({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => {
      return fetchPosts(pageParam as number, session?.user.accessToken);
    },
    initialPageParam: 1,
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
  });

  const posts = postPages?.pages.flatMap((page) => page.posts) || [];

  useEffect(() => {
    if (inView) {
      fetchNextPagePosts();
    }
  }, [fetchNextPagePosts, inView]);

  return (
    <div
      className={clsx(
        "flex flex-row justify-center items-start w-full gap-8 py-16 px-8",
        "md:flex-col-reverse md:items-center md:gap-4",
        "sm:flex-col-reverse md:items-center",
      )}
    >
      <div className="flex flex-col items-center justify-center w-full gap-8 lg:w-3/4">
        <CreatePost
          onPost={async (content, image) => {
            await postPost(content, image, session?.user.accessToken);
          }}
        />
        <Feed
          posts={posts || []}
          ref={ref}
          onLike={async (id) => {
            await likePost(id, session?.user.accessToken);
          }}
        />
        {isFetchingPostsNextPage && <Loading />}
      </div>
      <RightSide
        rankingProps={{
          users: [],
          onViewMore: () => {
            // TODO: implement view more
          },
        }}
        communitiesProps={{
          channels: [],
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onJoin: (_id) => {
            // TODO: implement join
          },
          query: query,
          onSearchChange: (e) => {
            setQuery(e?.target?.value || "");
          },
          onSearchClear: () => {
            setQuery("");
          },
        }}
      />
    </div>
  );
}

export default function SuspendedFeedPage() {
  return (
    <Layout>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            fallbackRender={({ resetErrorBoundary }) => (
              <Modal
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
            onReset={reset}
          >
            <Suspense fallback={<LoadingPage />}>
              <FeedPage />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Layout>
  );
}
