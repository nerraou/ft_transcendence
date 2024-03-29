import { ChangeEvent, FormEvent, forwardRef } from "react";
import Send from "./icons/outline/Send";

interface InputChatProps {
  value?: string;
  name?: string;
  onClick: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const InputChat = forwardRef<HTMLTextAreaElement, InputChatProps>(
  function InputChat(props, ref) {
    return (
      <form
        onSubmit={props.onClick}
        className="rounded-lg min-h-32 bg-light-bg-tertiary outline-none flex justify-between items-center box-border p-5 space-x-4"
      >
        <textarea
          rows={2}
          ref={ref}
          name={props.name}
          placeholder="Write something..."
          value={props.value}
          className="text-light-fg-primary max-h-32 min-h-[80px]bg-light-fg-tertiary focus-within:border-dark-useless rounded-lg outline-none w-full pt-4 pb-2 px-4 overflow-hidden border-2 border-light-fg-primary placeholder:translate-y-1"
          onChange={props.onChange}
        />
        <button type="submit">
          <Send className="stroke-light-fg-primary" />
        </button>
      </form>
    );
  },
);

export default InputChat;
