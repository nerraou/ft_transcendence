import Pencil from "@icons/outline/Pencil";
import Image from "next/image";

interface EditImageProps {
  image: string;
}

function EditImage(props: EditImageProps) {
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
      <Pencil color="stroke-light-fg-primary" />
    </div>
  );
}

export default EditImage;
