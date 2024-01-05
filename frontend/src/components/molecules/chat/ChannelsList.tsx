import { ChannelInformation } from "@app/chat/[[...username]]/page";
import InputSearch from "@components/atoms/InputSearch";
import Modal from "@components/atoms/Modal";
import Channel from "@components/atoms/chat/Channel";
import Add from "@components/atoms/icons/outline/Add";
import UsersAdd from "@components/atoms/icons/outline/UsersAdd";
import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import baseQuery, { RequestError } from "@utils/baseQuery";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import User from "@components/atoms/chat/User";
import UserPlus from "@components/atoms/icons/outline/UserPlus";

export interface ChannelProps {
  id: number;
  name: string;
  imagePath: string;
  description: string;
  membersCount: number;
  connectedMemberRole: "MEMBER" | "OWNER" | "ADMIN";
  type?: "PUBLIC";
}

interface ChannelAddUserProps {
  id: number;
  name: string;
  imagePath: string;
  description: string;
  membersCount: number;
  connectedMemberRole: "MEMBER" | "OWNER" | "ADMIN";
  type?: "PUBLIC";
  onChannelClick: (channelInformation: ChannelInformation) => void;
}

interface ChannelsListProps {
  channels: ChannelProps[];
  channelInformation: ChannelInformation;
  onChannelClick: (channelInformation: ChannelInformation) => void;
}

interface GetUser {
  token: string | unknown;
  username: string;
  channelId: number;
}

interface AddUserProps {
  channelId: number;
}

interface UserProps {
  id: number;
  status: "ONLINE" | "OFFLINE" | "IN_GAME";
  username: string;
  avatarPath: string;
}

interface InviteMember {
  channelId: number;
  username: string;
  token: string | unknown;
}

async function getUser(invite: GetUser) {
  const url =
    process.env.NEXT_PUBLIC_API_BASE_URL +
    `/users/search?search_query=${invite.username}&channel_id=${invite.channelId}`;

  const res = await baseQuery(url, {
    headers: {
      Authorization: `Bearer ${invite.token}`,
    },
  });
  const response = res.json();
  return response;
}

async function inviteMember(invite: InviteMember) {
  const api = process.env.NEXT_PUBLIC_API_BASE_URL + "/channels/users/invite";

  return await baseQuery(api, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${invite.token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      channelId: invite.channelId,
      username: invite.username,
    }),
  });
}

function useInviteMemberMutation() {
  const queryClient = useQueryClient();

  return useMutation<Response, RequestError, InviteMember>({
    mutationFn: inviteMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatChannels"] });
    },
  });
}

function AddUser(props: AddUserProps) {
  const imageUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/assets/images/";

  const [queryUsername, setQueryUsername] = useState("");
  const inviteMemberMutation = useInviteMemberMutation();
  const session = useSession();

  const token = session.data?.user.accessToken;
  const users = useQuery<UserProps[]>({
    queryKey: ["users/search", queryUsername],
    enabled: queryUsername.length > 1,
    queryFn: () => {
      return getUser({
        channelId: props.channelId,
        username: queryUsername,
        token: token,
      });
    },
  });

  return (
    <div className="bg-light-bg-tertiary flex flex-col space-y-6">
      <InputSearch
        value={queryUsername}
        bgColor="bg-light-fg-tertiary"
        textColor="text-light-fg-primary"
        placeholder="Search"
        width="w-full"
        onChange={(e) => {
          setQueryUsername(e.target.value);
        }}
        onClear={() => {
          setQueryUsername("");
        }}
      />
      <div className="flex flex-col space-y-2">
        {users.data?.map((user) => {
          return (
            <div key={user.id} className="flex justify-between items-center">
              <User
                avatarPath={imageUrl + user.avatarPath}
                status={user.status}
                username={user.username}
              />
              <button
                onClick={() =>
                  inviteMemberMutation.mutate({
                    channelId: props.channelId,
                    username: user.username,
                    token: token,
                  })
                }
                className="flex items-center justify-center w-10 h-10 hover:bg-light-fg-tertiary"
              >
                <UserPlus color="stroke-light-fg-primary" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChannelAddUser(props: ChannelAddUserProps) {
  const [isOpen, setIsOpen] = useState(false);

  function onClose() {
    return setIsOpen(false);
  }
  return (
    <div className="px-2 flex justify-between items-center space-x-2 hover:bg-light-bg-tertiary cursor-pointer">
      <div
        onClick={() => {
          props.onChannelClick({
            channelId: props.id,
            description: props.description,
            imagePath: props.imagePath,
            name: props.name,
            role: props.connectedMemberRole,
          });
        }}
      >
        <Channel
          name={props.name}
          imagePath={props.imagePath}
          membersCount={props.membersCount}
        />
      </div>
      <UsersAdd
        color="stroke-light-fg-primary"
        onClick={() => setIsOpen(true)}
      />
      <Modal
        title="INVITE USERS"
        onClose={onClose}
        isOpen={isOpen}
        description={clsx("Invite new Users To The", props.name)}
        action={<AddUser channelId={props.id} />}
      />
    </div>
  );
}

function ChannelsList(props: ChannelsListProps) {
  const imageUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/assets/images/";
  return (
    <div className="bg-light-fg-tertiary border-2 border-light-fg-primary rounded-lg p-4 space-y-4">
      <div className="flex justify-between px-4 py-2 bg-dark-bg-secondary border-2 border-light-fg-primary">
        <h3 className="text-base text-light-bg-secondary">#CHANNELS</h3>
        <Link href={`/chat/channels/create`}>
          <Add
            color="stroke-light-fg-primary"
            onClick={() => {
              return;
            }}
          />
        </Link>
      </div>
      <div className="space-y-4 px-3 scrollbar-thin h-56 overflow-auto scrollbar-thumb-light-fg-primary">
        {props.channels.map((channel) => {
          return (
            <div key={channel.id}>
              <ChannelAddUser
                id={channel.id}
                name={channel.name}
                connectedMemberRole={channel.connectedMemberRole}
                imagePath={imageUrl + channel.imagePath}
                membersCount={channel.membersCount}
                description={channel.description}
                onChannelClick={props.onChannelClick}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChannelsList;
