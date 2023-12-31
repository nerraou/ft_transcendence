"use client";

import { useSession } from "next-auth/react";
import { Popover, Transition } from "@headlessui/react";
import { redirect } from "next/navigation";
import { Fragment, Suspense, useState } from "react";

import LoadingPage from "../../loading";
import ChatBoxDms from "@components/organisms/ChatBox";
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

interface SidePanelProps {
  image: string;
  token: string | unknown;
  channelId: number;
  onChannelClick: (channelId: number) => void;
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
      <Popover.Button className="outline-none">
        <More color="stroke-light-fg-primary" />
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
            channelId={props.channelId}
            onChannelClick={props.onChannelClick}
          />
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

function Chat(props: ChatProps) {
  const [isChannel, setIsChannel] = useState<boolean>(false);
  const [channelId, setChannelId] = useState<number>(0);

  const { data: userData } = useUserProfileQuery(props.token);
  const { data: friendData } = useFriendQuery(props.token, props.username);

  const imageUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/assets/images/";

  return (
    <Fragment>
      <div className="w-1/3 lg:hidden md:hidden sm:hidden">
        <SidePanel
          image={imageUrl + userData.avatarPath}
          token={props.token}
          channelId={channelId}
          onChannelClick={(id) => {
            setChannelId(id);
            setIsChannel(true);
          }}
        />
      </div>
      <div className="2xl:hidden xl:hidden lg:visible md:visible sm:visible">
        <SidePanelPopover
          image={imageUrl + userData.avatarPath}
          token={props.token}
          channelId={channelId}
          onChannelClick={(id) => {
            setChannelId(id);
            setIsChannel(true);
          }}
        />
      </div>
      {isChannel && <p>IT is Channel bitch </p>}

      {!isChannel && (
        <div className="flex flex-col w-2/3 lg:w-full md:w-full sm:w-full">
          <ChatHeader
            image={imageUrl + friendData.avatarPath}
            status={friendData.status}
            username={friendData.username}
          />
          <ChatBoxDms
            receiver={props.username}
            userImage={imageUrl + userData.avatarPath}
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
              fallbackRender={({ resetErrorBoundary }) => (
                <Modal
                  isOpen
                  title="Error"
                  description="Something went wrong"
                  action={
                    <Button
                      text="Retry"
                      onClick={() => {
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
