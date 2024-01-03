import baseQuery, { RequestError } from "@utils/baseQuery";
import { useMutation } from "@tanstack/react-query";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import Mute from "../icons/outline/Mute";

interface ActionMuteMemberProps {
  token: string | unknown;
  channelId: number;
  memberId: number;
}

interface MuteMember {
  channelId: number;
  memberId: number;
  minutes: number;
  token: string | unknown;
}

async function muteMember(member: MuteMember) {
  const api = process.env.NEXT_PUBLIC_API_BASE_URL + "/channels/members/mute";

  return await baseQuery(api, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${member.token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      channelId: member.channelId,
      memberId: member.memberId,
      minutes: member.minutes,
    }),
  });
}

function ActionMuteMember(props: ActionMuteMemberProps) {
  const mutation = useMutation<Response, RequestError, MuteMember>({
    mutationFn: muteMember,
  });

  return (
    <Popover className="relative z-10">
      <Popover.Button className="outline-none">
        <Mute
          color="stroke-light-fg-primary"
          hover="hover:bg-light-bg-tertiary"
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
          <div className="p-4 flex space-x-2 items-center justify-center border-2 rounded-md bg-dark-bg-primary h-full max-w-max">
            <button
              className="text-center border  border-light-fg-primary hover:border-light-fg-tertiary rounded-full bg-light-bg-secondary text-sm text-light-fg-tertiary w-10 h-10"
              onClick={() => {
                return mutation.mutate({
                  channelId: props.channelId,
                  memberId: props.memberId,
                  token: props.token,
                  minutes: 15,
                });
              }}
              disabled={mutation.isPending}
            >
              15 m
            </button>
            <button
              className="text-center text-sm border border-light-fg-primary hover:border-light-fg-tertiary rounded-full bg-light-bg-secondary text-light-fg-tertiary w-10 h-10"
              onClick={() => {
                return mutation.mutate({
                  channelId: props.channelId,
                  memberId: props.memberId,
                  token: props.token,
                  minutes: 60,
                });
              }}
              disabled={mutation.isPending}
            >
              1 h
            </button>
            <button
              className="text-center text-sm border border-light-fg-primary hover:border-light-fg-tertiary rounded-full bg-light-bg-secondary text-light-fg-tertiary w-10 h-10"
              onClick={() => {
                return mutation.mutate({
                  channelId: props.channelId,
                  memberId: props.memberId,
                  token: props.token,
                  minutes: 480,
                });
              }}
              disabled={mutation.isPending}
            >
              8 h
            </button>
            <button
              className="text-center text-sm border border-light-fg-primary hover:border-light-fg-tertiary rounded-full bg-light-bg-secondary text-light-fg-tertiary w-10 h-10"
              onClick={() => {
                return mutation.mutate({
                  channelId: props.channelId,
                  memberId: props.memberId,
                  token: props.token,
                  minutes: 1440,
                });
              }}
              disabled={mutation.isPending}
            >
              24 h
            </button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default ActionMuteMember;
