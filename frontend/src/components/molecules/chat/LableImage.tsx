import EditImage from "../Settings/EditImage";

interface LableImageProps {
  labelValue: string;
  jwt: string | unknown;
  image: string;
}

function LableImage(props: LableImageProps) {
  return (
    <div className="flex sm:flex-col space-x-32 xl:space-x-28 lg:space-x-20 md:space-x-0 sm:space-x-0">
      <div className="w-40 md:w-60">
        <label className="text-dark-bg-primary text-base">
          {props.labelValue}
        </label>
      </div>
      <EditImage image={props.image} jwt={props.jwt} />
    </div>
  );
}

export default LableImage;
