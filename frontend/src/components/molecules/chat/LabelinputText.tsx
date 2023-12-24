import InputText from "@components/atoms/InputText";
import { ChangeEvent, forwardRef } from "react";
// import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors } from "react-hook-form";

interface LabelInputTextProps {
  labelValue: string;
  value?: string;
  name?: string;
  errors?: FieldErrors<any>;
  placeholder: string;
  borderColor: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LabelInputText = forwardRef<HTMLInputElement, LabelInputTextProps>(
  function LabelInputText(props, ref) {
    return (
      <div className="flex lg:flex-col md:flex-col sm:flex-col space-x-32 lg:space-x-0 md:space-x-0 sm:space-x-0">
        <div className="w-56 xl:w-64">
          <label className="text-dark-bg-primary text-lg ">
            {props.labelValue}
          </label>
        </div>
        <div>
          <InputText
            ref={ref}
            name={props.name}
            value={props.value}
            placeholder={props.placeholder}
            borderColor={props.borderColor}
            width="w-96 sm:w-full md:w-full"
            height="base"
            onChange={props.onChange}
          />
          {/* <ErrorMessage
            errors={props.errors}
            name={props.name as any}
            render={({ message }) => (
              <p className="text-light-fg-secondary">{message}</p>
            )}
          /> */}
        </div>
      </div>
    );
  },
);

export default LabelInputText;
