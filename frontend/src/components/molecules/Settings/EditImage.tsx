import Pencil from "@icons/outline/Pencil";
import Image from "next/image";
import { useRef, useState } from "react";
import ImageCroper from "./ImageCroper";
import useAvatarMutation from "./useAvatarMutation";

interface EditImageProps {
  jwt: string | unknown;
  image: string;
}

function EditImage(props: EditImageProps) {
  const [file, setFile] = useState<File | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const mutation = useAvatarMutation(props.jwt);

  function onClose() {
    setIsOpen(false);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function handleClick() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  return (
    <div className="flex flex-col justify-center items-center border-solid border-8 border-light-bg-secondary dark:border-light-fg-link rounded-lg bg-light-bg-tertiary max-w-max py-5 px-20">
      <div className="relative shrink-0 w-32 h-32 md:w-24 md:h-24 sm:w-20 sm:h-20 lg:w-16 lg:h-16">
        <Image
          src={props.image}
          alt="user image"
          fill
          sizes="w-32 h-32 md:w-24 md:h-24 sm:w-20 sm:h-20 lg:w-16 lg:h-16"
          className="rounded-lg object-cover appearance-none"
        />
      </div>
      <Pencil color="stroke-light-fg-primary" onClick={handleClick} />
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            setFile(files[0]);
            setIsOpen(true);
          }
        }}
      />
      {file && (
        <ImageCroper
          isOpen={isOpen}
          onClose={onClose}
          file={file}
          onCropComplete={(cropped) => {
            if (cropped) {
              mutation.mutate(cropped);
            }
          }}
        />
      )}
    </div>
  );
}

export default EditImage;
