import React from "react";
import Image from "next/image";
import Like from "../icons/outline/Like";
import LikeFilled from "../icons/outline/LikeFilled";

interface User {
  name: string;
  avatar?: string;
}

const UserCard = ({ user }: { user: User }) => {
  const defaultImage = "/default/user-circle.png";

  return (
    <div className="flex items-center gap-4 text-lg">
      <Image
        src={user.avatar || defaultImage}
        alt={user.name}
        width={50}
        height={50}
        className="rounded-full"
      />
      <p>{user.name}</p>
    </div>
  );
};

interface LikeProps {
  count: number;
  liked: boolean;
  onLike: (id: string) => void;
  postId: string;
}

const LikeSection = ({ count, liked, onLike, postId }: LikeProps) => {
  const formatCount = (count: number) => {
    if (count > 999) {
      return `${(count / 1000).toFixed(1)}k`;
    } else if (count > 999999) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    return count;
  };

  return (
    <div className="flex px-8 justify-between items-center rounded-full border border-light-fg-link bg-light-fg-secondary w-28 h-10 text-light-fg-tertiary">
      <p>{formatCount(count)}</p>
      <button onClick={() => onLike(postId)}>
        {liked ? (
          <LikeFilled className="w-4 h-4" />
        ) : (
          <Like className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};

interface PostData {
  id: string;
  user: User;
  content: string;
  image?: string;
  likes: number;
}

interface PostProps {
  post: PostData;
  onLike: (id: string) => void;
  liked: boolean;
}

const Post = ({ post, onLike, liked }: PostProps) => {
  return (
    <div className="inline-flex flex-col items-start gap-4 border-2 rounded-lg border-light-fg-link dark:border-dark-fg-primary bg-light-bg-primary dark:bg-dark-bg-primary px-8 py-4 shadow-light-lg w-full text-light-fg-primary dark:text-light-bg-tertiary">
      <UserCard user={post.user} />
      <p className="text-lg">{post.content}</p>
      {post.image && (
        <div>
          <Image
            src={post.image}
            alt={post.user.name}
            width={0}
            height={0}
            sizes="100vw"
            className="rounded-[8px] w-full h-auto min-w-[150px]"
          />
        </div>
      )}
      <LikeSection
        count={post.likes}
        liked={liked}
        onLike={onLike}
        postId={post.id}
      />
    </div>
  );
};

export default Post;
