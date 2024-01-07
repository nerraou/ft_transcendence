"use client";

import { useSession } from "next-auth/react";
import { Popover, Transition } from "@headlessui/react";
import { redirect, useRouter } from "next/navigation";
import { Fragment, Suspense, useState } from "react";

import LoadingPage from "../../loading";
import ChatBoxDms from "@components/organisms/ChatBoxDms";
import SidePanel from "@components/organisms/SidePanel";
import ChatHeader from "@molecules/chat/ChatHeader";
import Layout from "@templates/Layout";
import More from "@components/atoms/icons/outline/More";
import { useUserProfileQuery } from "@services/useUserProfileQuery";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Button from "@components/atoms/Button";
import Modal from "@components/atoms/Modal";
import { useFriendQuery } from "@services/useFriendQuery";
import ChannelHeader from "@components/molecules/chat/ChannelHeader";
import ChatBoxChannel from "@components/organisms/ChatBoxChannel";

interface SidePanelProps {
  image: string;
  token: string | unknown;
  channelInformation: ChannelInformation;
  onChannelClick: (channelInformation: ChannelInformation) => void;
  onFriendClick: () => void;
}

interface ChatPageProps {
  params: { username: string };
}

interface ChatProps {
  username: string;
  token: string | unknown;
}

function SidePanelPopover(props: SidePanelProps) {
  return (
    <Popover className="relative">
      <Popover.Button className="flex justify-center items-center outline-none bg-light-fg-secondary border-2 border-dark-fg-primary  dark:bg-light-bg-primary h-10 w-10 rounded-full">
        <More color="stroke-dark-fg-primary " />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-10">
          <SidePanel
            image={props.image}
            token={props.token}
            channelInformation={props.channelInformation}
            onChannelClick={props.onChannelClick}
            onFriendClick={props.onFriendClick}
          />
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export interface ChannelInformation {
  channelId: number;
  name: string;
  imagePath: string;
  description: string;
  role: "MEMBER" | "OWNER" | "ADMIN";
}

function Chat(props: ChatProps) {
  const [isChannel, setIsChannel] = useState<boolean>(false);
  const [channelInformation, setChannelInformation] =
    useState<ChannelInformation>({
      description: "",
      channelId: 0,
      imagePath: "",
      name: "",
      role: "MEMBER",
    });

  const { data: userData } = useUserProfileQuery(props.token);
  const router = useRouter();

  let username = userData.username;
  if (props.username) {
    username = props.username[0];
  }

  const { data: friendData } = useFriendQuery(props.token, username);

  const imageUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/assets/images/";

  if (friendData.isBlocked) {
    return (
      <Modal
        description="You are not allowed to see this page"
        title="Error"
        isOpen
        action={
          <Button text="Go Away" onClick={() => router.replace("/chat/")} />
        }
      />
    );
  }

  return (
    <Fragment>
      <div className="w-1/3 lg:hidden md:hidden sm:hidden">
        <SidePanel
          image={imageUrl + userData.avatarPath}
          token={props.token}
          channelInformation={channelInformation}
          onChannelClick={(information) => {
            setIsChannel(true);
            setChannelInformation(information);
          }}
          onFriendClick={() => {
            setIsChannel(false);
          }}
        />
      </div>
      <div className="2xl:hidden xl:hidden lg:visible md:visible sm:visible">
        <SidePanelPopover
          image={imageUrl + userData.avatarPath}
          token={props.token}
          channelInformation={channelInformation}
          onChannelClick={(information) => {
            setIsChannel(true);
            setChannelInformation(information);
          }}
          onFriendClick={() => {
            setIsChannel(false);
          }}
        />
      </div>
      {isChannel && (
        <div className="flex flex-col w-2/3 lg:w-full md:w-full sm:w-full">
          <ChannelHeader
            role={channelInformation.role}
            token={props.token}
            channelId={channelInformation.channelId}
            channelDescription={channelInformation.description}
            channelName={channelInformation.name}
            image={channelInformation.imagePath}
            onChannelLeave={() => {
              setIsChannel(false);
            }}
          />
          <ChatBoxChannel
            channelId={channelInformation.channelId}
            token={props.token}
            username={userData.username}
            userImage={imageUrl + userData.avatarPath}
          />
        </div>
      )}
      {!isChannel && (
        <div className="flex flex-col w-2/3 lg:w-full md:w-full sm:w-full">
          <ChatHeader
            id={friendData.id}
            isProfileOwner={friendData.isProfileOwner}
            image={imageUrl + friendData.avatarPath}
            status={friendData.status}
            username={friendData.username}
            isBlocked={friendData.isBlocked}
            isFriend={friendData.isFriend}
            token={props.token}
          />
          <ChatBoxDms
            username={userData.username}
            userImage={imageUrl + userData.avatarPath}
            receiver={username}
            friendImage={imageUrl + friendData.avatarPath}
            token={props.token}
          />
        </div>
      )}
    </Fragment>
  );
}

function ChatPage({ params }: ChatPageProps) {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  if (sessionStatus === "unauthenticated") {
    redirect("/sign-in");
  }

  if (sessionStatus === "loading") {
    return (
      <LoadingPage
        bgColor=" bg-light-bg-tertiary dark:bg-dark-bg-primary"
        width="w-screen"
        height="h-screen"
      />
    );
  }

  return (
    <Layout>
      <div className="flex p-8 lg:p-4 mb-5 space-x-2 justify-center items-stretch">
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ resetErrorBoundary, error }) => (
                <Modal
                  isOpen
                  title="Error"
                  description={
                    error.response?.status === 403
                      ? `This User does not exist`
                      : "Something went wrong"
                  }
                  action={
                    <Button
                      text={
                        error.response?.status === 403 ? `Go Home` : "Retry"
                      }
                      onClick={() => {
                        if (error.response?.status === 403) {
                          router.push("/chat/");
                        }
                        resetErrorBoundary();
                      }}
                    />
                  }
                />
              )}
            >
              <Suspense fallback={<LoadingPage />}>
                <Chat
                  username={params.username}
                  token={session?.user.accessToken}
                />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>
    </Layout>
  );
}

export default ChatPage;
