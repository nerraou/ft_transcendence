import InputChat from "@components/atoms/InputChat";
import ChatBubbleMessage from "@components/atoms/chat/ChatBubbleMessage";
import ChatBubbleResponse from "@components/atoms/chat/ChatBubbleResponse";
import { useSocket } from "@contexts/socket";
import { useEffect, useState } from "react";

interface ChatBoxProps {
  receiver: string;
  userImage: string;
  message: string;
  friendImage: string;
  response: string;
}

interface MessageProps {
  id: number;
  text: string;
}

interface SenderProps {
  id: number;
  avatarPath: string;
  username: string;
  firstName: string;
  lastName: string;
}

interface ResponseProps {
  message: MessageProps;
  sender: SenderProps;
}

function ChatBox(props: ChatBoxProps) {
  const [currentMessage, setCurrentMessage] = useState<string | undefined>();
  const [receivedMessage, setReceivedMessage] = useState<string | undefined>();
  const socket = useSocket();

  useEffect(() => {
    if (!socket) {
      return;
    }

    function onDirectMessage(message: ResponseProps) {
      setReceivedMessage(message.message.text);
    }

    function onError(error: string) {
      console.log(error);
    }

    socket?.on("message", onDirectMessage);
    socket?.on("error", onError);

    return () => {
      socket?.off("message", onDirectMessage);
      socket?.off("error", onError);
    };
  }, [socket]);

  function sendMessage() {
    if (!socket) {
      return;
    }
    socket?.emit("direct-message", {
      username: props.receiver,
      text: currentMessage,
    });
    setCurrentMessage("");
  }

  return (
    <div className="flex flex-col bg-dark-bg-primary h-screen border-4 px-5 py-10 border-light-bg-tertiary rounded-br-2xl">
      <section className="h-5/6">
        <ChatBubbleMessage
          image={props.userImage}
          message={currentMessage as string}
        />
        <ChatBubbleResponse
          image={props.friendImage}
          message={receivedMessage as string}
        />
      </section>

      <InputChat
        value={currentMessage}
        onChange={(e) => {
          setCurrentMessage(e.target.value);
        }}
        onClick={() => {
          sendMessage;
        }}
      />
    </div>
  );
}

export default ChatBox;
