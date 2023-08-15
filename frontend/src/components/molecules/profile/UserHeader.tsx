import BarStatus from "@atoms/BarStatus";
import DeviceGamePad from "@icons/outline/DeviceGamePad";
import Email from "@icons/outline/Email";
import Pencil from "@icons/outline/Pencil";
import Reflect from "@icons/outline/Reflect";
import UserIcon from "@icons/outline/User";
import UserBlock from "@icons/outline/UserBlock";
import UserMinus from "@icons/outline/UserMinus";
import UserPlus from "@icons/outline/UserPlus";
import User from "@atoms/user-header/User";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

export type UserStatus = "online" | "offline" | "in-game";

interface UserHeaderProps {
  fullname: string;
  username: string;
  image: string;
  userStatus: UserStatus;
  isProfileOwner: boolean;
  isFriend: boolean;
}
interface UserHeaderActionsProps {
  isProfileOwner: boolean;
  isFriend: boolean;
  status: UserStatus;
}

interface UserPopoverProps {
  isFriend: boolean;
}

function UserPopover(props: UserPopoverProps) {
  let action = "Add";

  if (props.isFriend) {
    action = "Remove";
  }

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
            <div className="flex items-center py-xs px-xs hover:bg-light-bg-tertiary rounded-sm">
              {!props.isFriend && <UserPlus color="stroke-light-fg-link" />}
              {props.isFriend && <UserMinus color="stroke-light-fg-link" />}
              <label className="text-sm text-light-fg-primary ml-sm">
                {action}
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

function UserHeaderActions(props: UserHeaderActionsProps) {
  if (props.isProfileOwner) {
    return <Pencil color="stroke-light-fg-link" />;
  } else {
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
        <UserPopover isFriend={props.isFriend} />
      </div>
    );
  }
}

function UserHeader(props: UserHeaderProps) {
  return (
    <div className="box-border rounded-xl border-4 border-light-fg-primary bg-light-fg-link shadow-xl">
      <BarStatus
        width="w-2/3"
        reverse={false}
        marginX="mx-12"
        marginY="my-base"
        status={props.userStatus}
      />
      <div className="relative flex justify-between h-60 mb-xxl mt-sm mx-12 pt-xl px-xl bg-light-bg-tertiary border-4 border-light-fg-primary rounded-xl">
        <div className="absolute right-0 bottom-0">
          <Reflect />
        </div>
        <User
          fullName={props.fullname}
          username={props.username}
          image={props.image}
        />
        <UserHeaderActions
          isFriend={props.isFriend}
          isProfileOwner={props.isProfileOwner}
          status={props.userStatus}
        />
      </div>
    </div>
  );
}

export default UserHeader;
