import Status from "@atoms/Status";
import DeviceGamePad from "@icons/outline/DeviceGamePad";
import Email from "@icons/outline/Email";
import UserIcon from "@icons/outline/User";
import UserBlock from "@icons/outline/UserBlock";
import UserMinus from "@icons/outline/UserMinus";
import User from "@atoms/UserCard";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

export type UserStatus = "online" | "offline" | "in-game";

interface FriendCardProps {
  fullname: string;
  username: string;
  level: number;
  image: string;
  userStatus: UserStatus;
}
interface FriendCardActionsProps {
  status: UserStatus;
}

function UserPopover() {
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
            <div className="flex items-center p-xs hover:bg-light-bg-tertiary rounded-sm">
              <UserMinus color="stroke-light-fg-link" />
              <label className="text-sm text-light-fg-primary ml-sm">
                Remove
              </label>
            </div>
            <div className="flex items-center py-xs px-xs hover:bg-light-bg-tertiary rounded-sm">
              <UserBlock color="stroke-light-fg-link" />
              <label className="text-sm text-light-fg-primary ml-sm">
                Block
              </label>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

function FriendCardActions(props: FriendCardActionsProps) {
  return (
    <div className="flex gap-1">
      <DeviceGamePad
        color="stroke-light-fg-link"
        hover="hover:bg-light-fg-tertiary"
        round="rounded-sm"
        animated={props.status == "online"}
      />
      <Email
        color="stroke-light-fg-link"
        hover="hover:bg-light-fg-tertiary"
        round="rounded-sm"
      />
      <UserPopover />
    </div>
  );
}

function FriendCard(props: FriendCardProps) {
  return (
    <div className="box-border rounded-xl border-4 border-light-fg-primary bg-light-fg-link dark:bg-dark-bg-tertiary shadow-light-l dark:shadow-dark-l">
      <div className="flex justify-between items-center mx-7">
        <label className="text-light-fg-primary text-xl leading-none">
          #{props.level}
        </label>
        <Status status={props.userStatus} />
      </div>
      <div className="mb-lg mx-xl p-xl pb-4 bg-light-bg-tertiary border-4 border-light-fg-primary rounded-xl">
        <div className="flex justify-start">
          <User
            fullName={props.fullname}
            username={props.username}
            image={props.image}
          />
        </div>
        <div className="flex justify-center">
          <FriendCardActions status={props.userStatus} />
        </div>
      </div>
    </div>
  );
}

export default FriendCard;
