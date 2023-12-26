import InputChat from "@components/atoms/InputChat";
import ChatBubbleMessage from "@components/atoms/chat/ChatBubbleMessage";
import ChatBubbleResponse from "@components/atoms/chat/ChatBubbleResponse";

interface ChatBoxProps {
  userImage: string;
  message: string;
  friendImage: string;
  response: string;
}

function ChatBox(props: ChatBoxProps) {
  return (
    <div className="flex flex-col bg-dark-bg-primary h-screen border-8 px-5 py-10 border-light-bg-tertiary rounded-br-2xl">
      <section className="h-5/6">
        <ChatBubbleMessage image={props.userImage} message={props.message} />
        <ChatBubbleResponse
          image={props.friendImage}
          message={props.response}
        />
      </section>
      <InputChat
        onChange={() => {
          return;
        }}
      />
    </div>
  );
}

export default ChatBox;
