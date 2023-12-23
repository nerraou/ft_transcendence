import { ChangeEvent, forwardRef } from "react";
import clsx from "clsx";
import Send from "./icons/outline/Send";

interface InputChatProps {
  value?: string;
  name?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const InputChat = forwardRef<HTMLTextAreaElement, InputChatProps>(
  function InputChat(props, ref) {
    return (
      <div className="rounded-lg bg-light-bg-tertiary outline-none flex justify-between items-center box-border p-5 space-x-8">
        <textarea
          rows={2}
          ref={ref}
          name={props.name}
          placeholder="Write somthing..."
          value={props.value}
          className={clsx(
            "text-light-fg-primary block bg-light-fg-tertiary focus-within:border-dark-useless rounded-lg outline-none w-full pt-4 pb-2 px-4 overflow-hidden border-2 border-light-fg-primary placeholder:translate-y-1",
          )}
          onChange={props.onChange}
        />
        <Send className="stroke-light-fg-primary" />
      </div>
    );
  },
);

export default InputChat;
