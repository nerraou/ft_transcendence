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
import { redirect } from "next/navigation";
import RankingModal from "@components/molecules/feed/RankingModal";

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
  onLike: (id: number) => Promise<Response>;
}

const Feed = (props: FeedProps) => {
  const imageUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/assets/images/";
  const { posts, onLike } = props;
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
          onLike={onLike}
          liked={post.likedByUser}
        />
      ))}
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

/**
 * Fetches posts from the API based on the specified page number and token.
 * @param page - The page number of the posts to fetch.
 * @param token - The authentication token used for authorization.
 * @returns An object containing the fetched posts and the next page number, if available.
 */
async function fetchPosts(page: number, token: string | unknown) {
  const limit = 2;
  const url =
    process.env.NEXT_PUBLIC_API_BASE_URL + `/posts?limit=${limit}&page=${page}`;

  const res = await baseQuery(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  let nextPage: number | null = page + 1;
  const response = await res.json();
  if (response.posts?.length == 0) {
    nextPage = null;
  }
  return { ...response, nextPage: nextPage };
}

/**
 * Posts a new post to the server.
 * @param {string} content - The content of the post.
 * @param {string} image - The image associated with the post.
 * @param {string | unknown} token - The authentication token.
 * @returns {Promise<any>} - A promise that resolves to the server response.
 */
async function postPost(
  content: string,
  image: File | undefined,
  token: string | unknown,
) {
  const formData = new FormData();
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/posts";
  formData.append("content", content);
  formData.append("image", image || "");
  const res = await baseQuery(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const response = await res.json();
  return response;
}

/**
 * Like a post.
 * @param id - The ID of the post to like.
 * @param token - The user's authentication token.
 * @returns A Promise that resolves to the result of the like operation.
 */
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

interface FeedPageProps {
  token: string | unknown;
}
function FeedPage(props: FeedPageProps) {
  const { token } = props;
  const [query, setQuery] = useState("");
  const [rankingModalOpen, setRankingModalOpen] = useState(false);
  const [rankingPage, setRankingPage] = useState(1);

  const { ref, inView } = useInView();

  const {
    data: postPages,
    isFetchingNextPage: isFetchingPostsNextPage,
    fetchNextPage: fetchNextPagePosts,
    hasNextPage,
  } = useSuspenseInfiniteQuery<UserProps>({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => {
      return fetchPosts(pageParam as number, token);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.nextPage === null) {
        return null;
      }
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
    <div className="flex flex-col justify-center">
      <div
        className={clsx(
          "flex flex-row justify-center items-start w-full gap-8 py-16 px-8",
          "md:flex-col-reverse md:items-center md:gap-4",
          "sm:flex-col-reverse md:items-center",
        )}
      >
        <RankingModal
          isOpen={rankingModalOpen}
          onClose={() => setRankingModalOpen(false)}
          page={rankingPage}
          onPageChange={(page) => setRankingPage(page)}
          total={0}
          users={[]}
        />
        <div className="flex flex-col items-center justify-center w-full gap-8 lg:w-3/4">
          <CreatePost
            onPost={async (content, image) => {
              return await postPost(content, image, token).then(() => {
                fetchNextPagePosts();
              });
            }}
          />
          <Feed
            posts={posts || []}
            onLike={async (id) => {
              return await likePost(id, token);
            }}
          />
          {isFetchingPostsNextPage && <Loading />}
        </div>
        <RightSide
          rankingProps={{
            users: [],
            onViewMore: () => {
              setRankingModalOpen(true);
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
      {hasNextPage ? (
        <div className="inline-flex justify-center sm:mb-16 mt-8" ref={ref}>
          {isFetchingPostsNextPage ? (
            <Loading width="w-16" height="w-16" />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default function SuspendedFeedPage() {
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
              <FeedPage token={session?.user.accessToken} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Layout>
  );
}
