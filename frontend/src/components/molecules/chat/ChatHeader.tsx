import User from "@components/atoms/chat/User";
import DeviceGamePad from "@components/atoms/icons/outline/DeviceGamePad";
import MenuDots from "@components/atoms/icons/outline/MenuDots";

import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useBlockUser } from "@app/profile/[username]/userProfile";
import UserPlus from "@components/atoms/icons/outline/UserPlus";
import UserMinus from "@components/atoms/icons/outline/UserMinus";
import UserBlock from "@components/atoms/icons/outline/UserBlock";
interface ChatHeaderProps {
  status: "ONLINE" | "OFFLINE" | "IN_GAME";
  username: string;
  image: string;
}

interface MenuDotsPopoverProps {
  isFriend: boolean;
  id: number;
  token: string | unknown;
}

function MenuDotsPopover(props: MenuDotsPopoverProps) {
  const blockUser = useBlockUser(props.token, props.id);
  let action = "Add";

  if (props.isFriend) {
    action = "Remove";
  }

  return (
    <Popover className="relative">
      <Popover.Button className="outline-none">
        <MenuDots
          color="stroke-dark-bg-primary"
          hover="hover:bg-light-fg-tertiary"
        />
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
          <div className="flex flex-col border-2 border-light-fg-primary dark:border-dark-fg-primary  rounded-md bg-light-fg-tertiary p-sm">
            <button className="flex items-center p-xs hover:bg-light-bg-tertiary rounded-sm">
              {!props.isFriend && (
                <UserPlus color="stroke-light-fg-primary dark:stroke-dark-fg-primary" />
              )}
              {props.isFriend && (
                <UserMinus color="stroke-light-fg-primary dark:stroke-dark-fg-primary" />
              )}
              <label className="text-base text-light-fg-primary dark:text-dark-fg-primary ml-sm">
                {action}
              </label>
            </button>
            <button
              disabled={blockUser.status === "pending"}
              className="flex items-center py-xs px-xs hover:bg-light-bg-tertiary rounded-sm"
              onClick={() =>
                blockUser.mutate({ token: props.token, id: props.id })
              }
            >
              <UserBlock color="stroke-light-fg-primary dark:stroke-dark-fg-primary" />
              <label className="text-base text-light-fg-primary dark:text-dark-fg-primary ml-sm">
                Block
              </label>
            </button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

function ChatHeader(props: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between py-3 px-8 sm:px-4 border-4 bg bg-light-fg-tertiary border-light-bg-tertiary rounded-tr-xl">
      <User
        username={props.username}
        avatarPath={props.image}
        status={props.status}
      />
      <div className="flex items-center space-x-5">
        <DeviceGamePad color="stroke-dark-fg-primary" />
        <MenuDotsPopover isFriend id={1} token="" />
      </div>
    </div>
  );
}

export default ChatHeader;
