import Image from "next/image";
import React, { useRef, useState } from "react";
import Send from "@icons/outline/Send";
import Photo from "@icons/outline/Photo";

interface CreatePostProps {
  avatar?: string;
  onPost: (content: string, image: string) => void;
}

const CreatePost = ({ avatar, onPost }: CreatePostProps) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | undefined) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileUploaded: File | undefined = event?.target?.files?.[0];
    handleFile(fileUploaded);
  };

  return (
    <div className="flex flex-col items-start justify-center gap-8 rounded-lg px-8 py-4 border-2 shadow-light-lg border-light-fg-link dark:border-dark-bg-primary4 bg-light-bg-tertiary dark:bg-dark-fg-primary">
      <div className="flex flex-row items-start justify-center gap-4 w-full">
        <Image
          src={avatar || "/default/user-circle.png"}
          alt="user avatar"
          width={0}
          height={0}
          sizes="50px"
          className="rounded-full object-cover h-[50px] w-[50px]"
        />
        <div className="flex flex-col items-start justify-center gap-8 w-full">
          <textarea
            cols={10}
            className="w-full rounded-[10px] bg-light-fg-tertiary py-2 px-4 min-h-[50px] text-light-fg-link text-[18px] placeholder-light-fg-link"
            placeholder="What are you thinking?"
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex flex-row items-center justify-between w-full">
            <button
              onClick={() => hiddenFileInput.current?.click()}
              className="flex flex-row items-center justify-center gap-2 rounded-2xl bg-light-fg-secondary text-light-fg-tertiary h-10 w-24 border border-light-fg-link dark:border-dark-bg-primary4 dark:bg-dark-fg-primary"
            >
              <Photo className="w-4 h-4 text-light-bg-tertiary" />
              Photo
              <input
                type="file"
                onChange={handleChange}
                ref={hiddenFileInput}
                className="hidden"
              />
            </button>
            <button
              onClick={() => onPost(content, image)}
              className="flex flex-row items-center justify-center gap-2 rounded-2xl bg-light-bg-secondary text-light-fg-tertiary h-10 w-24 border border-light-fg-link "
            >
              <Send className="w-4 h-4" />
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
