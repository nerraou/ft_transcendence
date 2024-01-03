import InputSearch from "@components/atoms/InputSearch";
import Modal from "@components/atoms/Modal";
import Channel from "@components/atoms/chat/Channel";
import MenuDots from "@components/atoms/icons/outline/MenuDots";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { Fragment, useState } from "react";
import { useChannelQuery } from "@services/useChannelQuery";

import ActionsOwner from "./ActionsOwner";
import ActionsMember from "./ActionsMember";
import ActionsAdmin from "./ActionsAdmin";

interface ChannelHeaderProps {
  channelId: number;
  token: string | unknown;
  image: string;
  channelName: string;
  channelDescription: string;
  role: "MEMBER" | "OWNER" | "ADMIN";
}

interface MenuDotsPopoverProps {
  role: "MEMBER" | "OWNER" | "ADMIN";
  id: number;
  token: string | unknown;
  showMembers: () => void;
}

interface ManageMemebersProps {
  token: string | unknown;
  channelId: number;
  isMember: boolean;
  isOwner: boolean;
  isAdmin: boolean;
}

function ManageMemebers(props: ManageMemebersProps) {
  const { data } = useChannelQuery(props.token, props.channelId);

  return (
    <div className="flex flex-col space-y-4">
      <InputSearch
        value={""}
        bgColor="bg-light-fg-tertiary"
        textColor="text-light-fg-primary"
        placeholder="Search"
        width="w-full"
        onChange={() => {
          return;
        }}
        onClear={() => {
          return;
        }}
      />
      <div className="px-2 overflow-scroll h-96 scrollbar-thin scrollbar-thumb-dark-bg-primary">
        {props.isMember && (
          <ActionsMember members={data.members} token={props.token} />
        )}
        {props.isOwner && (
          <ActionsOwner members={data.members} token={props.token} />
        )}
        {props.isAdmin && (
          <ActionsAdmin members={data.members} token={props.token} />
        )}
      </div>
    </div>
  );
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
          <div className="flex flex-col space-y-2 items-start border-2 border-light-fg-primary dark:border-dark-fg-primary rounded-md bg-light-fg-tertiary p-base">
            <button
              onClick={props.showMembers}
              className="text-base text-light-fg-primary dark:text-dark-fg-primary hover:bg-light-bg-tertiary "
            >
              <p>Members</p>
            </button>
            {isOwner && (
              <Link href={`chat/channels/update/${props.id}`}>
                <label className="text-base text-light-fg-primary dark:text-dark-fg-primary hover:bg-light-bg-tertiary">
                  Update
                </label>
              </Link>
            )}
            <label className="text-base text-light-fg-primary dark:text-dark-fg-primary hover:bg-light-bg-tertiary">
              Leave
            </label>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

function ChannelHeader(props: ChannelHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  function onClose() {
    return setIsOpen(false);
  }

  return (
    <div className="flex items-center justify-between py-3 px-8 sm:px-4 border-4 bg bg-light-fg-tertiary border-light-bg-tertiary rounded-tr-xl">
      <Channel
        imagePath={props.image}
        name={props.channelName}
        description={props.channelDescription}
      />
      <MenuDotsPopover
        showMembers={() => setIsOpen(true)}
        id={props.channelId}
        role="OWNER"
        token=""
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={clsx("THE", props.channelName.toUpperCase())}
        description="Interatct with channel's members"
        action={
          <ManageMemebers
            channelId={props.channelId}
            isAdmin={props.role == "ADMIN"}
            isMember={props.role == "MEMBER"}
            isOwner={props.role == "OWNER"}
            token={props.token}
          />
        }
      />
    </div>
  );
}

export default ChannelHeader;
