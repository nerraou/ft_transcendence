import Image from "next/image";

interface ChatBubbelMessageProps {
  image: string;
  message: string;
}

function ChatBubbelMessage(props: ChatBubbelMessageProps) {
  return (
    <div className="relative max-h-max w-full p-1">
      <div className="absolute top-0 left-0">
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
      <div className="ml-8 mt-2 w-80 text-light-fg-tertiary border-2 bg-dark-fg-primary border-light-bg-tertiary rounded-r-lg rounded-bl-lg p-4">
        {props.message}
      </div>
    </div>
  );
}

export default ChatBubbelMessage;
