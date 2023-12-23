import Image from "next/image";
import React, { useRef, useState } from "react";
import Send from "@icons/outline/Send";
import Photo from "@icons/outline/Photo";
import X from "@components/atoms/icons/outline/X";

interface CreatePostProps {
  avatar?: string;
  onPost: (content: string, image: File | undefined) => Promise<void>;
}

const CreatePost = ({ avatar, onPost }: CreatePostProps) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File>();
  const [loading, setLoading] = useState(false);

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileUploaded: File | undefined = event?.target?.files?.[0];
    if (fileUploaded) {
      setImage(fileUploaded);
    }
  };

  return (
    <div className="flex flex-col items-start justify-center gap-8 rounded-lg px-8 sm:px-2 sm:py-2 py-4 border-2 shadow-light-lg border-light-fg-link dark:border-dark-bg-primary4 bg-light-bg-tertiary dark:bg-dark-fg-primary w-full">
      <div className="flex flex-row items-start justify-center gap-4 w-full sm:flex-col">
        <Image
          src={avatar || "/default/user-circle.png"}
          alt="user avatar"
          width={0}
          height={0}
          sizes="50px"
          className="rounded-full object-cover h-12 w-12"
        />
        <div className="flex flex-col items-start justify-center gap-8 w-full">
          <textarea
            cols={10}
            value={content}
            className="w-full rounded-base bg-light-fg-tertiary py-2 px-4 min-h-[50px] text-light-fg-link text-base placeholder-light-fg-link"
            placeholder="What are you thinking?"
            onChange={(e) => setContent(e.target.value)}
          />
          {image && (
            <>
              <div className="flex items-end w-full justify-end">
                <button
                  disabled={loading}
                  onClick={() => setImage(undefined)}
                  className="text-light-fg-primary dark:text-dark-fg-primary flex"
                >
                  clear <X />
                </button>
              </div>
              <Image
                src={URL.createObjectURL(image)}
                alt={"post image"}
                width={0}
                height={0}
                sizes="100vw"
                className="rounded-base w-full h-auto min-w-full"
              />
            </>
          )}
          <div className="flex flex-row items-center justify-between w-full">
            <button
              disabled={loading}
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
              disabled={loading}
              onClick={() => {
                setLoading(true);
                onPost(content, image)
                  .then(() => {
                    setContent("");
                    setImage(undefined);
                  })
                  .finally(() => setLoading(false));
              }}
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
