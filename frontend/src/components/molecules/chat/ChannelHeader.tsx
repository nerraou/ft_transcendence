import Channel from "@components/atoms/chat/Channel";
import MenuDots from "@components/atoms/icons/outline/MenuDots";
import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";

interface ChannelHeaderProps {
  image: string;
  channelName: string;
  channelDescription: string;
}

interface MenuDotsPopoverProps {
  role: "MEMBER" | "OWNER" | "ADMIN";
  id: number;
  token: string | unknown;
}

function MenuDotsPopover(props: MenuDotsPopoverProps) {
  const isOwner = props.role == "OWNER";

  return (
    <Popover className="relative">
      <Popover.Button className="outline-none">
        <MenuDots color="stroke-dark-bg-primary" />
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
        <Popover.Panel className="absolute">
          <div className="flex flex-col border-2 border-light-fg-primary dark:border-dark-fg-primary rounded-md bg-light-fg-tertiary p-base">
            {isOwner && (
              <Link href="chat/channels/update">
                <label className="text-base text-light-fg-primary hover:bg-light-bg-tertiary">
                  Update
                </label>
              </Link>
            )}
            <label className="text-base text-light-fg-primary hover:bg-light-bg-tertiary">
              Members
            </label>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

function ChannelHeader(props: ChannelHeaderProps) {
  return (
    <div className="flex items-center justify-between py-3 px-8 sm:px-4 border-4 bg bg-light-fg-tertiary border-light-bg-tertiary rounded-tr-xl">
      <Channel
        imagePath={props.image}
        name={props.channelName}
        description={props.channelDescription}
      />
      <MenuDotsPopover id={1} role="OWNER" token="" />
    </div>
  );
}

export default ChannelHeader;
