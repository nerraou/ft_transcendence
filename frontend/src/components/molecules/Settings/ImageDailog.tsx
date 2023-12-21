import Image from "next/image";

interface ImageDailogProps {
  image: string;
}

export default function ImageDailog(props: ImageDailogProps) {
  return (
    <Image width={100} height={100} alt="cropwd image" src={props.image} />
  );
}
