import React from "react";
import Image from "next/image";
import Like from "@icons/outline/Like";
import LikeFilled from "@icons/outline/LikeFilled";
import { useState } from "react";
import { useLikePost } from "@app/feed/feedApiService";
import Link from "next/link";

interface User {
  name: string;
  avatar?: string | null;
  username: string;
}

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  const defaultImage = "/default/user-circle.png";

  return (
    <Link
      className="flex items-center gap-4 text-lg"
      href={`/profile/${user.username}`}
    >
      <Image
        src={user.avatar || defaultImage}
        alt={user.name}
        width={50}
        height={50}
        className="rounded-full"
      />
      <p>{user.name}</p>
    </Link>
  );
};

interface LikeSectionProps {
  count: number;
  liked: boolean;
  onLike: (id: number) => void;
  postId: number;
  disabled?: boolean;
}

const LikeSection = ({
  count,
  liked,
  onLike,
  postId,
  disabled = false,
}: LikeSectionProps) => {
  const formatCount = (formattedCount: number) => {
    if (formattedCount > 999) {
      return `${(formattedCount / 1000).toFixed(1)}k`;
    } else if (formattedCount > 999999) {
      return `${(formattedCount / 1000000).toFixed(1)}M`;
    }
    return formattedCount;
  };

  return (
    <div className="flex px-8 justify-between items-center rounded-full border border-light-fg-link bg-light-fg-secondary w-28 h-10 text-light-fg-tertiary">
      <p>{formatCount(count)}</p>
      <button onClick={() => onLike(postId)} disabled={disabled}>
        {liked ? (
          <LikeFilled className="w-4 h-4" />
        ) : (
          <Like className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};

export interface PostData {
  id: number;
  user: User;
  content: string | null;
  image: string | null;
  likes: number;
  createdAt: string;
}

interface PostProps {
  post: PostData;
  liked: boolean;
  token?: string | unknown;
}

const Post = ({ post, liked, token }: PostProps) => {
  const [isLiked, setIsLiked] = useState(liked);
  const [count, setCount] = useState(post.likes);

  const onError = () => {
    setIsLiked(!isLiked);
    setCount(isLiked ? count - 1 : count + 1);
  };

  const onLikeMutation = useLikePost(token, onError);
  const date = new Date(post.createdAt);
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString(
    [],
    { hour: "2-digit", minute: "2-digit" },
  )}`;

  return (
    <div className="inline-flex flex-col items-start gap-4 border-2 rounded-lg border-light-fg-link dark:border-dark-fg-primary bg-light-bg-primary dark:bg-dark-bg-primary px-8 sm:px-2 sm:py-2 py-4 shadow-light-lg w-full text-light-fg-primary dark:text-light-bg-tertiary">
      <UserCard user={post.user} />
      <p className="text-xs">{formattedDate}</p>
      <p className="text-lg">{post.content}</p>
      {post.image && (
        <div>
          <Image
            src={post.image}
            alt={post.user.name}
            width={0}
            height={0}
            sizes="100vw"
            className="rounded-base w-full h-auto min-w-[150px]"
          />
        </div>
      )}
      <LikeSection
        count={count}
        liked={isLiked}
        disabled={onLikeMutation.status === "pending"}
        onLike={(id) => {
          setIsLiked(!isLiked);
          setCount(isLiked ? count - 1 : count + 1);
          onLikeMutation.mutate(id);
        }}
        postId={post.id}
      />
    </div>
  );
};

export default Post;
