import { ErrorMessage } from "@hookform/error-message";
import EditImage from "./EditImage";
import { FieldErrors } from "react-hook-form";

interface LableImageProps {
  labelValue: string;
  originalImage: string;
  image?: File;
  setImage: (image: File) => void;
  errors?: FieldErrors<any>;
  name?: string;
}

function LabelImage(props: LableImageProps) {
  return (
    <div className="flex lg:flex-col md:flex-col sm:flex-col space-x-32 lg:space-x-0 md:space-x-0 sm:space-x-0">
      <div className="w-56 xl:w-60">
        <label className="text-dark-bg-primary text-lg ">
          {props.labelValue}
        </label>
      </div>
      <div>
        <EditImage
          image={props.image}
          originalImage={props.originalImage}
          setImage={props.setImage}
        />
        {props.errors && props.image ? (
          <ErrorMessage
            errors={props.errors}
            name={props.name as any}
            render={({ message }) => (
              <p className="text-light-fg-secondary">{message}</p>
            )}
          />
        ) : null}
      </div>
    </div>
  );
}

export default LabelImage;
