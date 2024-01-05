import InputSearch from "@components/atoms/InputSearch";
import Modal from "@components/atoms/Modal";
import Channel from "@components/atoms/chat/Channel";
import MenuDots from "@components/atoms/icons/outline/MenuDots";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useChannelQuery } from "@services/useChannelQuery";

import ActionsOwner from "./ActionsOwner";
import ActionsMember from "./ActionsMember";
import ActionsAdmin from "./ActionsAdmin";
import baseQuery, { RequestError } from "@utils/baseQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ChannelHeaderProps {
  channelId: number;
  token: string | unknown;
  image: string;
  channelName: string;
  channelDescription: string;
  onChannelLeave: () => void;
  role: "MEMBER" | "OWNER" | "ADMIN";
}

interface MenuDotsPopoverProps {
  role: "MEMBER" | "OWNER" | "ADMIN";
  id: number;
  token: string | unknown;
  showMembers: () => void;
  onChannelLeave: () => void;
}

interface ManageMemebersProps {
  token: string | unknown;
  channelId: number;
  isMember: boolean;
  isOwner: boolean;
  isAdmin: boolean;
}

interface LeaveChannel {
  channelId: number;
  token: string | unknown;
}

interface Member {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  avatarPath: string;
  rating: number;
}

export interface MembersData {
  id: number;
  memberId: number;
  channelId: number;
  member: Member;
}

async function leaveChannel(leave: LeaveChannel) {
  const api = process.env.NEXT_PUBLIC_API_BASE_URL + "/channels/leave";

  return await baseQuery(api, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${leave.token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      channelId: leave.channelId,
    }),
  });
}

function useLeaveChannelMutation() {
  const queryClient = useQueryClient();
  return useMutation<Response, RequestError, LeaveChannel>({
    mutationFn: leaveChannel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatChannels"] });
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });
}

function ManageMemebers(props: ManageMemebersProps) {
  const { data } = useChannelQuery(props.token, props.channelId);
  const [searchMember, setSearchMember] = useState("");
  const [filtredMembers, setFiltredMembers] = useState<MembersData[]>([]);

  useEffect(() => {
    if (data.members) {
      setFiltredMembers(data.members);
    }
  }, [data.members]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const searchTerm = e.target.value;
    setSearchMember(searchTerm);

    const filtredItems = data.members.filter((member) => {
      return member.member.username
        .toLowerCase()
        .startsWith(searchTerm.toLowerCase());
    });
    setFiltredMembers(filtredItems);
  }

  return (
    <div className="flex flex-col space-y-4">
      <InputSearch
        value={searchMember}
        bgColor="bg-light-fg-tertiary"
        textColor="text-light-fg-primary"
        placeholder="Search"
        width="w-full"
        onChange={handleInputChange}
        onClear={() => {
          setSearchMember("");
          setFiltredMembers(data.members);
        }}
      />
      <div className="px-2 overflow-scroll h-96 scrollbar-thin scrollbar-thumb-dark-bg-primary">
        {props.isMember && (
          <ActionsMember members={filtredMembers} token={props.token} />
        )}
        {props.isOwner && (
          <ActionsOwner members={filtredMembers} token={props.token} />
        )}
        {props.isAdmin && (
          <ActionsAdmin members={filtredMembers} token={props.token} />
        )}
      </div>
    </div>
  );
}

function MenuDotsPopover(props: MenuDotsPopoverProps) {
  const isOwner = props.role == "OWNER";
  const leaveChannelMutation = useLeaveChannelMutation();

  return (
    <Popover className="relative">
      <Popover.Button className="flex justify-center items-center outline-none rounded-full w-6 h-7">
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
        <Popover.Panel className="absolute right-0 z-10">
          <div className="flex flex-col space-y-2 items-start border-2 border-light-fg-primary dark:border-dark-fg-primary rounded-md bg-light-fg-tertiary p-base">
            <button
              onClick={props.showMembers}
              className="text-base px-2 text-light-fg-primary dark:text-dark-fg-primary hover:bg-light-bg-tertiary "
            >
              <label className="inline-block w-full">Members</label>
            </button>

            {isOwner && (
              <Link
                href={`/chat/channels/update/${props.id}`}
                className="w-full"
              >
                <label className="inline-block text-base text-light-fg-primary dark:text-dark-fg-primary hover:bg-light-bg-tertiary px-2 w-full">
                  Update
                </label>
              </Link>
            )}

            <button
              onClick={() => {
                leaveChannelMutation.mutate({
                  token: props.token,
                  channelId: props.id,
                });
                props.onChannelLeave();
              }}
              disabled={leaveChannelMutation.isPending}
              className="text-base px-2 text-light-fg-primary dark:text-dark-fg-primary hover:bg-light-bg-tertiary "
            >
              <Link href={`/chat`} className="w-full">
                <label className="inline-block">Leave</label>
              </Link>
            </button>
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
        onChannelLeave={props.onChannelLeave}
        showMembers={() => setIsOpen(true)}
        id={props.channelId}
        role={props.role}
        token={props.token}
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
