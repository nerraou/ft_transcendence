"use client";

import BarStatus from "@atoms/BarStatus";
import DeviceGamePad from "@icons/outline/DeviceGamePad";
import Email from "@icons/outline/Email";
import Pencil from "@icons/outline/Pencil";
import Reflect from "@icons/outline/Reflect";
import UserIcon from "@icons/outline/User";
import UserBlock from "@icons/outline/UserBlock";
import UserMinus from "@icons/outline/UserMinus";
import UserPlus from "@icons/outline/UserPlus";
import User from "@atoms/UserCard";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

import { UserStatus } from "../FriendCard";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useAddFriendMutation from "@services/useAddFriendMutation";
import useRemoveFriendMutation from "@services/useRemoveFriendMutation";
import { useBlockUserMutation } from "@services/useBlockUserMutation";

interface UserHeaderProps {
  fullname: string;
  username: string;
  level: number;
  image: string;
  userStatus: UserStatus;
  isProfileOwner: boolean;
  isFriend: boolean;
  noIcons?: boolean;
  id: number;
}
interface UserHeaderActionsProps {
  username: string;
  isProfileOwner: boolean;
  isFriend: boolean;
  noIcons?: boolean;
  status: UserStatus;
  id: number;
}

interface UserPopoverProps {
  isFriend: boolean;
  id: number;
}

function UserPopover(props: UserPopoverProps) {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  const blockUserMutation = useBlockUserMutation();
  const addUserMutation = useAddFriendMutation();
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
            {!props.isFriend && (
              <button
                disabled={addUserMutation.isPending}
                onClick={() =>
                  addUserMutation.mutate({
                    token: session?.user.accessToken,
                    userId: props.id,
                  })
                }
                className="flex items-center p-xs hover:bg-light-bg-tertiary rounded-sm"
              >
                <UserPlus color="stroke-light-fg-link" />
                <label className="text-sm text-light-fg-primary ml-sm">
                  Add
                </label>
              </button>
            )}

            {props.isFriend && (
              <button
                disabled={removeUserMutation.isPending}
                onClick={() =>
                  removeUserMutation.mutate({
                    token: session?.user?.accessToken,
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
            )}

            <button
              disabled={blockUserMutation.isPending}
              className="flex items-center py-xs px-xs hover:bg-light-bg-tertiary rounded-sm"
              onClick={() =>
                blockUserMutation.mutate({ token: token, id: props.id })
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

function UserHeaderActions(props: UserHeaderActionsProps) {
  const router = useRouter();

  if (props.noIcons) {
    return null;
  } else if (props.isProfileOwner) {
    return (
      <button className="flex" onClick={() => router.push("/profile/settings")}>
        <Pencil color="stroke-light-fg-link" />
      </button>
    );
  } else {
    return (
      <div className="flex gap-1 sm:gap-0">
        <DeviceGamePad
          color="stroke-light-fg-link"
          hover="hover:bg-light-fg-tertiary"
          round="rounded-sm"
          animated={props.status == "ONLINE"}
          onClick={() => {
            if (props.isProfileOwner) {
              router.push("/game/make");
            } else {
              router.push(`/game/make?username=${props.username}`);
            }
          }}
        />
        <button
          className="flex"
          onClick={() => router.push(`/chat/${props.username}`)}
        >
          <Email
            color="stroke-light-fg-link"
            hover="hover:bg-light-fg-tertiary"
            round="rounded-sm"
          />
        </button>
        <UserPopover isFriend={props.isFriend} id={props.id} />
      </div>
    );
  }
}

function UserHeader(props: UserHeaderProps) {
  return (
    <div className="box-border rounded-xl border-4 border-light-fg-primary bg-light-fg-link dark:bg-dark-bg-tertiary shadow-light-xl dark:shadow-dark-xl">
      <BarStatus status={props.userStatus} />
      <div className="relative flex justify-between sm:justify-center h-60 mb-xxl sm:mb-lg mx-12 sm:mx-4 pt-xl px-xl bg-light-bg-tertiary border-4 border-light-fg-primary rounded-xl">
        <div className="absolute right-0 bottom-0">
          <Reflect />
        </div>
        <div className="flex flex-col">
          <User
            fullName={props.fullname}
            username={props.username}
            image={props.image}
          />
          <label className="text-light-fg-link text-xxl lg:text-xl md:text-xl sm:text-base sm:text-center leading-none lg:leading-normal md:leading-normal">
            #{props.level}
          </label>
        </div>
        <UserHeaderActions
          noIcons={props.noIcons}
          isFriend={props.isFriend}
          isProfileOwner={props.isProfileOwner}
          status={props.userStatus}
          username={props.username}
          id={props.id}
        />
      </div>
    </div>
  );
}

export default UserHeader;
