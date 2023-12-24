import { ChangeEvent, forwardRef } from "react";
// import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors } from "react-hook-form";
import clsx from "clsx";

interface LabelInputTextAreaProps {
  labelValue: string;
  value?: string;
  name?: string;
  errors?: FieldErrors<any>;
  placeholder: string;
  borderColor: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const LabelInputTextArea = forwardRef<
  HTMLTextAreaElement,
  LabelInputTextAreaProps
>(function LabelInputTextArea(props, ref) {
  return (
    <div className="flex sm:flex-col space-x-32 xl:space-x-28 lg:space-x-20 md:space-x-0 sm:space-x-0">
      <div className="w-40 md:w-60">
        <label className="text-dark-bg-primary text-base">
          {props.labelValue}
        </label>
      </div>
      <div>
        <textarea
          rows={4}
          ref={ref}
          name={props.name}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
          className={clsx(
            props.borderColor,
            "w-96 sm:w-full text-light-fg-primary max-h-32 min-h-[80px] bg-light-bg-tertiary focus-within:border-dark-useless rounded-lg outline-none p-4 overflow-hidden border-2 border-light-fg-primary",
          )}
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
});

export default LabelInputTextArea;
