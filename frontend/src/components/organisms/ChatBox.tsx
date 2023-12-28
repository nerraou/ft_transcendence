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

interface Message {
  id: number;
  text: string;
}

interface Sender {
  id: number;
  avatarPath: string;
  username: string;
  firstName: string;
  lastName: string;
}

interface Response {
  message: Message;
  sender: Sender;
}

interface Messages {
  isReceived: boolean;
  text: string;
}

function ChatBox(props: ChatBoxProps) {
  const [messages, setMessages] = useState<Messages[]>([]);

  const [messageText, setMessageText] = useState("");

  const socket = useSocket();

  useEffect(() => {
    if (!socket) {
      return;
    }

    function onDirectMessage(message: Response) {
      if (message.sender.username == props.receiver) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: message.message.text, isReceived: true },
        ]);
      }
    }

    function onError(error: string) {
      console.log(error);
    }

    socket.on("message", onDirectMessage);
    socket.on("error", onError);

    return () => {
      socket.off("message", onDirectMessage);
      socket.off("error", onError);
    };
  }, [socket, props.receiver, messages]);

  function sendMessage() {
    if (!socket) {
      return;
    }
    socket.emit("direct-message", {
      username: props.receiver,
      text: messageText,
    });
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: messageText, isReceived: false },
    ]);
    setMessageText("");
  }

  return (
    <div className="flex flex-col bg-dark-bg-primary h-screen border-4 px-5 py-10 border-light-bg-tertiary rounded-br-2xl">
      <div className="h-5/6 pr-4 scrollbar-thin scrollbar-thumb-dark-fg-primary overflow-auto">
        <section>
          {messages.map((message, index) => {
            if (message.isReceived) {
              return (
                <ChatBubbleResponse
                  key={index}
                  image={props.friendImage}
                  message={message.text}
                />
              );
            } else {
              return (
                <ChatBubbleMessage
                  key={index}
                  image={props.userImage}
                  message={message.text}
                />
              );
            }
          })}
        </section>
      </div>

      <InputChat
        value={messageText}
        onChange={(e) => {
          setMessageText(e.target.value);
        }}
        onClick={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      />
    </div>
  );
}

export default ChatBox;
