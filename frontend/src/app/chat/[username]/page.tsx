"use client";

import ChatBox from "@components/organisms/ChatBox";
import SidePanel from "@components/organisms/SidePanel";
import ChatHeader from "@molecules/chat/ChatHeader";
import Layout from "@templates/Layout";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import More from "@components/atoms/icons/outline/More";
interface SidePanelProps {
  image: string;
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
          <SidePanel image={props.image} />
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

function ChatPage({ params }: { params: { username: string } }) {
  return (
    <Layout>
      <div className="flex p-8 lg:p-4 mb-5 space-x-2 justify-center items-stretch">
        <div className="w-1/3 lg:hidden md:hidden sm:hidden">
          <SidePanel image="/totoro.jpg" />
        </div>
        <div className="2xl:hidden xl:hidden lg:visible md:visible sm:visible">
          <SidePanelPopover image="/totoro.jpg" />
        </div>
        <div className="flex flex-col w-2/3 lg:w-full md:w-full sm:w-full">
          <ChatHeader image="/anime.jpg" status="ONLINE" username="noface" />
          <ChatBox
            receiver={params.username}
            friendImage="/anime.jpg"
            message="Hello how are you?"
            response="I am fine thnk you"
            userImage="/totoro.jpg"
          />
        </div>
      </div>
    </Layout>
  );
}

export default ChatPage;
