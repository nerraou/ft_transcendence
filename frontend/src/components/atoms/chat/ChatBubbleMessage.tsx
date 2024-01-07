import Image from "next/image";

interface ChatBubbleMessageProps {
  image: string;
  message: string;
}

function ChatBubbleMessage(props: ChatBubbleMessageProps) {
  return (
    <div className="relative max-h-max w-full p-1">
      <div className="absolute top-0 right-0">
        <div className="relative shrink-0 w-8 h-8">
          <Image
            src={props.image}
            alt="user image"
            fill
            sizes="w-8 h-8"
            className="rounded-lg object-cover appearance-none"
          />
        </div>
      </div>
      <div className="flex justify-end ">
        <p className="break-words top-4 right-4 mr-8 mt-2 w-80 text-light-fg-tertiary border-2 bg-dark-bg-primary border-light-bg-tertiary rounded-l-lg rounded-br-lg p-4">
          {props.message}
        </p>
      </div>
    </div>
  );
}

export default ChatBubbleMessage;
