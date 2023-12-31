import InputChat from "@components/atoms/InputChat";
import ChatBubbleResponse from "@components/atoms/chat/ChatBubbleMessage";
import ChatBubbleMessage from "@components/atoms/chat/ChatBubbleMessage";
import Loading from "@components/atoms/icons/outline/Loading";
import { useSocket } from "@contexts/socket";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import baseQuery from "@utils/baseQuery";
import { Fragment, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface ChatBoxChannelProps {
  token: string | unknown;
  channelId: number;
  username: string;
  userImage: string;
}

interface user {
  id: number;
  username: string;
  avatarPath: string;
}

interface Response {
  channelId: number;
  message: string;
  user: user;
}

interface Message {
  message: string;
  user?: user;
  isReceived: boolean;
}

interface MessagesListProps {
  id: number;
  username: string;
  token: string | unknown;
}

interface member {
  id: number;
  avatarPath: string;
  username: string;
  rating: number;
}

interface sender {
  id: number;
  state: "KICKED" | "BANNED " | "null";
  mutedUntil: string;
  createdAt: string;
  member: member;
}
interface OldMessage {
  id: number;
  messge: string;
  senderId: number;
  channelId: number;
  createdAt: string;
  updatedAt: string;
  sender: sender;
}

interface OldMessages {
  count: number;
  messages: OldMessage[];
  nextPage: [];
}

async function getMessages(page: number, id: number, token: string | unknown) {
  const limit = 50;
  const url =
    process.env.NEXT_PUBLIC_API_BASE_URL +
    `/channels/${id}/messages/?limit=${limit}&page=${page}`;

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
      queryKey: ["messages", props.id],
      queryFn: ({ pageParam }) => {
        return getMessages(pageParam as number, props.id, props.token);
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
              if (value.sender.member.username != props.username) {
                return (
                  <ChatBubbleResponse
                    key={value.id}
                    image={imageUrl + value.sender.member.avatarPath}
                    message={value.messge}
                  />
                );
              } else {
                return (
                  <ChatBubbleMessage
                    key={value.id}
                    image={imageUrl + value.sender.member.avatarPath}
                    message={value.messge}
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

function ChatBoxChannel(props: ChatBoxChannelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  const socket = useSocket();
  const imageUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/assets/images/";

  useEffect(() => {
    if (!socket) {
      return;
    }

    function onDirectMessage(message: Response) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: message.message, isReceived: true, user: message.user },
      ]);
    }

    function onError(error: string) {
      console.log(error);
    }

    socket.on("channel-chat-message", onDirectMessage);
    socket.on("error", onError);

    return () => {
      socket.off("channel-chat-message", onDirectMessage);
      socket.off("error", onError);
    };
  }, [socket]);

  function sendMessage() {
    if (!socket) {
      return;
    }
    socket.emit("channel-chat-message", {
      channelId: props.channelId,
      message: messageText,
    });
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: messageText, isReceived: false },
    ]);
    setMessageText("");
  }

  return (
    <div className="flex flex-col bg-dark-bg-primary h-screen border-4 px-5 py-10 border-light-bg-tertiary rounded-br-2xl">
      <div className="h-5/6 pr-4 scrollbar-thin scrollbar-thumb-dark-fg-primary overflow-auto">
        <MessagesList
          id={props.channelId}
          username={props.username}
          token={props.token}
        />
        <section>
          {messages.map((message, index) => {
            if (message.isReceived) {
              return (
                <ChatBubbleResponse
                  key={index}
                  image={imageUrl + message.user?.avatarPath}
                  message={message.message}
                />
              );
            } else {
              return (
                <ChatBubbleMessage
                  key={index}
                  image={props.userImage}
                  message={message.message}
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

export default ChatBoxChannel;
