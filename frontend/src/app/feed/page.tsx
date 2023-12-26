"use client";

import Layout from "@templates/Layout";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Loading from "@components/atoms/icons/outline/Loading";
import LoadingPage from "../loading";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
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
import { useUserProfileQuery } from "@services/useUserProfileQuery";
import { CreatePostResponse, useFeedQuery } from "./feedApiService";
import CustomModal from "@components/atoms/CustomModal";

export interface FullPostData {
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
  token: string | unknown;
}

const Feed = (props: FeedProps) => {
  const imageUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/assets/images/";
  const { posts, token } = props;

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
          liked={post.likedByUser}
          token={token}
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

interface FeedPageProps {
  token: string | unknown;
}
function FeedPage(props: FeedPageProps) {
  const { token } = props;
  const [query, setQuery] = useState("");
  const [rankingModalOpen, setRankingModalOpen] = useState(false);
  const [rankingPage, setRankingPage] = useState(1);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [message, setMessage] = useState("Something went wrong");
  const [posts, setPosts] = useState<FullPostData[]>([]);

  const onPostSuccess = (post: CreatePostResponse) => {
    setPosts([
      {
        id: post.id,
        content: post.content,
        imagePath: post.imagePath,
        likesCount: 0,
        createdAt: post.createdAt,
        likedByUser: false,
        owner: {
          id: currentUser?.id,
          username: currentUser?.username,
          avatarPath: currentUser?.avatarPath,
          firstName: currentUser?.firstName,
          lastName: currentUser?.lastName,
        },
      },
      ...posts,
    ]);
  };

  const onPostError = (error: string) => {
    setMessage(error);
    setErrorModalOpen(true);
  };

  const { ref, inView } = useInView();
  const { data: currentUser } = useUserProfileQuery(token);
  const {
    postPages,
    isFetchingPostsNextPage,
    fetchNextPagePosts,
    hasNextPage,
  } = useFeedQuery(token);

  useEffect(() => {
    const tmpPosts: FullPostData[] = [];
    const set = new Set();
    if (postPages) {
      postPages.pages.forEach((page) => {
        page.posts.forEach((post) => {
          if (!set.has(post.id)) {
            set.add(post.id);
            tmpPosts.push(post);
          }
        });
      });
      setPosts(tmpPosts);
    }
  }, [postPages]);

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
        <CustomModal
          isOpen={errorModalOpen}
          onClose={() => setErrorModalOpen(false)}
          title="Error"
          description={message}
        />
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
            avatar={
              currentUser &&
              process.env.NEXT_PUBLIC_API_BASE_URL +
                "/assets/images/" +
                currentUser.avatarPath
            }
            token={token}
            onPostSuccess={onPostSuccess}
            onPostError={onPostError}
          />
          <Feed posts={posts || []} token={token} />
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
