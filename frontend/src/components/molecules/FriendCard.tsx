"use client";

import Status from "@atoms/Status";
import DeviceGamePad from "@icons/outline/DeviceGamePad";
import Email from "@icons/outline/Email";
import UserIcon from "@icons/outline/User";
import UserBlock from "@icons/outline/UserBlock";
import UserMinus from "@icons/outline/UserMinus";
import User from "@atoms/UserCard";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useBlockUserMutation } from "@services/useBlockUserMutation";
import useRemoveFriendMutation from "@services/useRemoveFriendMutation";
import Link from "next/link";

export type UserStatus = "ONLINE" | "OFFLINE" | "IN_GAME";

interface FriendCardProps {
  fullname: string;
  token: string | unknown;
  id: number;
  username: string;
  level: number;
  image: string;
  userStatus: UserStatus;
}
interface FriendCardActionsProps {
  status: UserStatus;
  username: string;
  token: string | unknown;
  id: number;
}

function UserPopover(props: FriendCardActionsProps) {
  const blockUserMutation = useBlockUserMutation();
  const removeUserMutation = useRemoveFriendMutation();

  return (
    <Popover className="relative">
      <Popover.Button className="outline-none">
        <UserIcon
          color="stroke-light-fg-link"
          hover="hover:bg-light-fg-tertiary"
          round="rounded-sm"
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
          <div className="flex flex-col bg-light-fg-tertiary p-sm rounded-base">
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
              <UserMinus color="stroke-light-fg-link" />
              <label className="text-sm text-light-fg-primary ml-sm">
                Remove
              </label>
            </button>

            <button
              disabled={blockUserMutation.isPending}
              className="flex items-center py-xs px-xs hover:bg-light-bg-tertiary rounded-sm"
              onClick={() =>
                blockUserMutation.mutate({ token: props.token, id: props.id })
              }
            >
              <UserBlock color="stroke-light-fg-link" />
              <label className="text-sm text-light-fg-primary ml-sm">
                Block
              </label>
            </button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

function FriendCardActions(props: FriendCardActionsProps) {
  return (
    <div className="flex gap-1">
      <Link href={`/game/make?username=${props.username}`}>
        <DeviceGamePad
          color="stroke-light-fg-link"
          hover="hover:bg-light-fg-tertiary"
          round="rounded-sm"
          animated={props.status == "ONLINE"}
        />
      </Link>
      <Link href={`/chat/${props.username}`}>
        <Email
          color="stroke-light-fg-link"
          hover="hover:bg-light-fg-tertiary"
          round="rounded-sm"
        />
      </Link>
      <UserPopover
        id={props.id}
        status={props.status}
        token={props.token}
        username={props.username}
      />
    </div>
  );
}

function FriendCard(props: FriendCardProps) {
  return (
    <div className="box-border rounded-xl border-4 border-light-fg-primary bg-light-fg-link dark:bg-dark-bg-tertiary shadow-light-l dark:shadow-dark-l">
      <div className="flex justify-between items-center mx-7">
        <label className="text-light-fg-tertiary text-xl leading-none">
          #{props.level}
        </label>
        <Status status={props.userStatus} />
      </div>
      <div className="mb-lg mx-xl p-xl sm:px-2 lg:px-sm pb-4 bg-light-bg-tertiary border-4 border-light-fg-primary rounded-xl">
        <div className="flex justify-start">
          <Link href={`/profile/${props.username}`}>
            <User
              fullName={props.fullname}
              username={props.username}
              image={props.image}
            />
          </Link>
        </div>
        <div className="flex justify-center">
          <FriendCardActions
            username={props.username}
            token={props.token}
            status={props.userStatus}
            id={props.id}
          />
        </div>
      </div>
    </div>
  );
}

export default FriendCard;
