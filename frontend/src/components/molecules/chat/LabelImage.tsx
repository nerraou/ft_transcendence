import EditImage from "../Settings/EditImage";

interface LableImageProps {
  labelValue: string;
  jwt: string | unknown;
  image: string;
}

function LabelImage(props: LableImageProps) {
  return (
    <div className="flex lg:flex-col md:flex-col sm:flex-col space-x-32 lg:space-x-0 md:space-x-0 sm:space-x-0">
      <div className="w-56 xl:w-60">
        <label className="text-dark-bg-primary text-lg ">
          {props.labelValue}
        </label>
      </div>
      <EditImage image={props.image} jwt={props.jwt} />
    </div>
  );
}

export default LabelImage;
