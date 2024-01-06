import Pencil from "@icons/outline/Pencil";
import Image from "next/image";
import { useRef, useState } from "react";
import ImageCroper from "../Settings/ImageCroper";

interface EditImageProps {
  originalImage: string;
  image?: File;
  setImage: (image: File) => void;
}

function EditImage(props: EditImageProps) {
  const [file, setFile] = useState<File | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="flex flex-col justify-center items-center border-solid border-8 border-light-fg-link rounded-lg bg-light-bg-tertiary max-w-max py-5 px-20">
      <div className="relative shrink-0 w-32 h-32 md:w-24 md:h-24 sm:w-20 sm:h-20 lg:w-16 lg:h-16">
        {props.originalImage.length > 0 || props.image ? (
          <Image
            src={
              props?.image
                ? URL.createObjectURL(props?.image) || ""
                : props.originalImage
            }
            alt="user image"
            fill
            sizes="w-32 h-32 md:w-24 md:h-24 sm:w-20 sm:h-20 lg:w-16 lg:h-16"
            className="rounded-lg object-cover appearance-none"
          />
        ) : (
          <p className="text-light-fg-primary text-base text-center">
            Select an image
          </p>
        )}
      </div>
      {/* onhover: cursor-pointer */}
      <Pencil
        color="stroke-light-fg-primary cursor-pointer"
        onClick={handleClick}
      />
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
          isSuccess={false}
          isPending={false}
          isOpen={isOpen}
          onClose={onClose}
          file={file}
          onCropComplete={(cropped) => {
            if (cropped) {
              const reader = new FileReader();
              reader.readAsDataURL(cropped);
              reader.onloadend = () => {
                const base64data = reader.result;
                if (typeof base64data === "string") {
                  const base64Image = base64data.split(";base64,").pop();
                  if (base64Image) {
                    const imageFile = new File(
                      [Buffer.from(base64Image, "base64")],
                      "image.png",
                      {
                        type: "image/png",
                      },
                    );
                    props.setImage(imageFile);
                  }
                }
              };
            }
          }}
          isChannelModal={true}
        />
      )}
    </div>
  );
}

export default EditImage;
