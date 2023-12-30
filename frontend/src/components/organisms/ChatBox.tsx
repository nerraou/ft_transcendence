import InputChat from "@components/atoms/InputChat";
import ChatBubbleMessage from "@components/atoms/chat/ChatBubbleMessage";
import ChatBubbleResponse from "@components/atoms/chat/ChatBubbleResponse";
import { useSocket } from "@contexts/socket";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import baseQuery from "@utils/baseQuery";
import { Fragment, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

import Loading from "@components/atoms/icons/outline/Loading";

interface ChatBoxProps {
  receiver: string;
  userImage: string;
  friendImage: string;
  token: string | unknown;
}

interface SocketMessage {
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
  message: SocketMessage;
  sender: Sender;
}

interface Message {
  isReceived: boolean;
  text: string;
}

interface MessagesListProps {
  token: string | unknown;
  receiver: string;
}

interface OldMessage {
  id: number;
  senderId: number;
  receiverId: number;
  isRead: boolean;
  text: string;
  createdAt: string;
  updatedAt: string;
  sender: Sender;
}

interface OldMessages {
  count: number;
  messages: OldMessage[];
  nextPage: [];
}

async function getMessages(
  page: number,
  username: string,
  token: string | unknown,
) {
  const limit = 50;
  const url =
    process.env.NEXT_PUBLIC_API_BASE_URL +
    `/users/messages/${username}?limit=${limit}&page=${page}`;

  const res = await baseQuery(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  let nextPage: number | null = page + 1;
  const response = await res.json();
  if (response.count == 0) {
    nextPage = null;
  }

  return { ...response, nextPage: nextPage };
}

function MessagesList(props: MessagesListProps) {
  const { ref, inView } = useInView();
  const imageUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/assets/images/";

  const { data, isFetchingPreviousPage, fetchPreviousPage } =
    useSuspenseInfiniteQuery<OldMessages>({
      queryKey: ["messages", props.receiver],
      queryFn: ({ pageParam }) => {
        return getMessages(pageParam as number, props.receiver, props.token);
      },
      initialPageParam: 1,
      getPreviousPageParam: (_, pages) => {
        return pages.length + 1 ?? undefined;
      },
      getNextPageParam: (_, pages) => {
        return pages.length + 1 ?? undefined;
      },
    });

  useEffect(() => {
    if (inView) {
      fetchPreviousPage();
    }
  }, [fetchPreviousPage, inView]);

  return (
    <section>
      <div className="flex justify-center" ref={ref}>
        {isFetchingPreviousPage ? <Loading height="h-5" width="w-5" /> : null}
      </div>
      {data?.pages?.map((page, key) => {
        return (
          <Fragment key={key}>
            {page.messages?.map((value) => {
              if (value.sender.username == props.receiver) {
                return (
                  <ChatBubbleResponse
                    key={value.id}
                    image={imageUrl + value.sender.avatarPath}
                    message={value.text}
                  />
                );
              } else {
                return (
                  <ChatBubbleMessage
                    key={value.id}
                    image={imageUrl + value.sender.avatarPath}
                    message={value.text}
                  />
                );
              }
            })}
          </Fragment>
        );
      })}
    </section>
  );
}

function ChatBox(props: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  const socket = useSocket();
  const ref = useRef<HTMLElement>(null);

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
        <MessagesList receiver={props.receiver} token={props.token} />
        <section ref={ref}>
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
          if (ref.current) {
            ref.current.scrollIntoView({
              behavior: "instant",
            });
          }
        }}
      />
    </div>
  );
}

export default ChatBox;
