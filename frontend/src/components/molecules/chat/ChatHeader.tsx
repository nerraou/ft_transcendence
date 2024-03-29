import User from "@components/atoms/chat/User";
import DeviceGamePad from "@components/atoms/icons/outline/DeviceGamePad";
import MenuDots from "@components/atoms/icons/outline/MenuDots";

import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import UserPlus from "@components/atoms/icons/outline/UserPlus";
import UserMinus from "@components/atoms/icons/outline/UserMinus";
import UserBlock from "@components/atoms/icons/outline/UserBlock";
import useAddFriendMutation from "@services/useAddFriendMutation";
import useRemoveFriendMutation from "@services/useRemoveFriendMutation";
import { useBlockUserMutation } from "@services/useBlockUserMutation";
import Link from "next/link";
interface ChatHeaderProps {
  id: number;
  status: "ONLINE" | "OFFLINE" | "IN_GAME";
  username: string;
  image: string;
  isFriend: boolean;
  isBlocked: boolean;
  isProfileOwner: boolean;
  token: string | unknown;
}

interface MenuDotsPopoverProps {
  id: number;
  isBlocked: boolean;
  isFriend: boolean;
  token: string | unknown;
}

function MenuDotsPopover(props: MenuDotsPopoverProps) {
  const blockUserMutation = useBlockUserMutation();
  const addUserMutation = useAddFriendMutation();
  const removeUserMutation = useRemoveFriendMutation();

  return (
    <Popover className="relative">
      <Popover.Button className="flex justify-center items-center outline-none rounded-full w-6 h-7">
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
        <Popover.Panel className="absolute right-0 z-10">
          <div className="flex flex-col border-2 border-light-fg-primary dark:border-dark-fg-primary  rounded-md bg-light-fg-tertiary p-sm">
            {!props.isFriend && (
              <button
                disabled={addUserMutation.isPending}
                onClick={() =>
                  addUserMutation.mutate({
                    token: props.token,
                    userId: props.id,
                  })
                }
                className="flex items-center p-xs hover:bg-light-bg-tertiary rounded-sm"
              >
                <UserPlus color="stroke-light-fg-primary dark:stroke-dark-fg-primary" />
                <label className="text-base text-light-fg-primary dark:text-dark-fg-primary ml-sm">
                  Add
                </label>
              </button>
            )}

            {props.isFriend && (
              <button
                disabled={removeUserMutation.isPending}
                onClick={() =>
                  removeUserMutation.mutate({
                    token: props.token,
                    userId: props.id,
                  })
                }
                className="flex items-center p-xs hover:bg-light-bg-tertiary rounded-sm"
              >
                <UserMinus color="stroke-light-fg-primary dark:stroke-dark-fg-primary" />
                <label className="text-base text-light-fg-primary dark:text-dark-fg-primary ml-sm">
                  Remove
                </label>
              </button>
            )}

            <button
              disabled={blockUserMutation.isPending}
              className="flex items-center py-xs px-xs hover:bg-light-bg-tertiary rounded-sm"
              onClick={() =>
                blockUserMutation.mutate({ token: props.token, id: props.id })
              }
            >
              <Link href={"/chat/"}>
                <UserBlock color="stroke-light-fg-primary dark:stroke-dark-fg-primary" />
              </Link>

              <Link href={"/chat/"}>
                <label className="text-base text-light-fg-primary dark:text-dark-fg-primary ml-sm">
                  Block
                </label>
              </Link>
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
      <Link href={`/profile/${props.username}`}>
        <User
          username={props.username}
          avatarPath={props.image}
          status={props.status}
        />
      </Link>
      {!props.isProfileOwner && (
        <div className="flex items-center space-x-5">
          <Link href={`/game/make?username=${props.username}`}>
            <DeviceGamePad color="stroke-dark-fg-primary" />
          </Link>
          <MenuDotsPopover
            isFriend={props.isFriend}
            isBlocked={props.isBlocked}
            id={props.id}
            token={props.token}
          />
        </div>
      )}
    </div>
  );
}

export default ChatHeader;
