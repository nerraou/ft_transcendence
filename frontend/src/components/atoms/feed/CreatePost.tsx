import Image from "next/image";
import React, { useState } from "react";

interface CreatePostProps {
  avatar?: string;
  onPost: (content: string, image: string) => void;
}

const CreatePost = ({ avatar, onPost }: CreatePostProps) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  return (
    <div className="flex flex-col items-center justify-center gap-8 rounded-lg px-0 py-[2px] border-2 shadow-light-lg border-light-fg-link dark:border-dark-bg-primary4 bg-light-bg-tertiary dark:bg-dark-fg-primary">
      <div className="flex flex-row items-center justify-center">
        <Image
          src={avatar || "/default/user-circle.png"}
          alt="user avatar"
          width={50}
          height={50}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row items-center justify-center">
          <input
            type="text"
            placeholder="What are you thinking?"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="flex flex-row items-center justify-center">
          <input type="file" onChange={(e) => setImage(e.target.value)} />
          <button onClick={() => onPost(content, image)}>Post</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
