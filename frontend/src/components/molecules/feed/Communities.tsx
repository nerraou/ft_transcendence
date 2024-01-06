import InputSearch from "@components/atoms/InputSearch";
import ChannelCard from "@components/atoms/channel/ChannelCard";
import React, { useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChannelType } from "@components/atoms/chat/ChannelForm";
import { useJoinCommunity } from "@app/feed/feedApiService";
import Modal from "@components/atoms/Modal";
import Button from "@components/atoms/Button";
import Loading from "@components/atoms/icons/outline/Loading";

interface PasswordPopoverProps {
  onJoin: (id: number, password?: string) => void;
  id: number;
  channelName: string;
  isLoading?: boolean;
}

function PasswordPopover({
  onJoin,
  id,
  channelName,
  isLoading,
}: PasswordPopoverProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleJoin = () => {
    if (password.length < 4) {
      setError("Password must be at least 4 characters long");
      return;
    }
    onJoin(id, password);
  };
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="flex items-center justify-center w-24 h-10 rounded-lg bg-light-fg-link text-light-fg-tertiary min-w-min">
            Join
          </Popover.Button>
          <Transition
            show={open}
            as={Popover.Panel}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-out duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            className="absolute z-10 w-56 max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl"
          >
            <Popover.Panel className="absolute z-10 right-20">
              <div className="overflow-hidden w-60 rounded-base border border-light-fg-primary dark:border-dark-fg-primary">
                <div className="relative grid gap-8 dark:bg-light-bg-tertiary bg-light-fg-tertiary p-7 lg:grid-cols-2">
                  <div className="flex flex-col justify-between gap-2 w-full">
                    <div className="flex flex-row justify-between w-full">
                      <p className="text-light-fg-primary text-base">
                        Join {channelName}
                      </p>
                    </div>

                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg dark:bg-light-fg-tertiary bg-light-bg-tertiary py-2 px-4 min-h-[50px] max-h-96 text-light-fg-link text-base placeholder-light-fg-link"
                      placeholder="Password"
                    />
                    <p className="text-light-fg-secondary text-sm">
                      {error && error}
                    </p>
                    <Button
                      onClick={() => handleJoin()}
                      text="Join"
                      loading={isLoading}
                      customStyle="max-w-[100px]"
                    />
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

export interface Channel {
  id: number;
  name: string;
  description: string;
  imagePath: string;
  type: ChannelType;
  creatorId: number;
  membersCount: number;
}

export interface CommunitiesProps {
  channels: Channel[];
  query: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClear: () => void;
  currentUserId: number;
  token: string | unknown;
  isLoading?: boolean;
}

const Communities = ({
  channels,
  query,
  onSearchChange,
  onSearchClear,
  token,
  isLoading,
}: CommunitiesProps) => {
  const imageUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/assets/images/";
  const {
    join,
    isError,
    reset,
    isLoading: isJoinLoading,
    isSuccess,
    error,
  } = useJoinCommunity(token);

  const getErrorMessage = (status?: number) => {
    switch (status) {
      case 403:
        return "You are already a member of this community";
      case 401:
        return "The password you entered is incorrect";
      default:
        return "Something went wrong";
    }
  };

  return (
    <div className="flex flex-col align-start w-full gap-8 p-8 rounded-lg border border-light-fg-link bg-light-bg-tertiary dark:bg-dark-fg-tertiary dark:border-dark-fg-primary">
      {(isError || isSuccess) && (
        <Modal
          isOpen
          title={isError ? "Error" : "Success"}
          description={
            isSuccess
              ? "Joined Successfully"
              : getErrorMessage(error?.response?.status)
          }
          action={
            <Button
              text="Ok"
              onClick={() => {
                reset();
              }}
            />
          }
        />
      )}
      <div className="flex flex-row justify-between w-full">
        <p className="text-light-fg-primary text-xl lg:text-lg md:text-md sm:text-base">
          #Communities
        </p>
      </div>
      <InputSearch
        placeholder="Search..."
        value={query}
        onChange={onSearchChange}
        onClear={onSearchClear}
        textColor="light-fg-link"
        width="w-full"
      />
      <div className="flex flex-col align-start w-full min-h-[300px] gap-8">
        {isLoading && (
          <div className="flex flex-row justify-center w-full">
            <Loading height="h-20" width="w-20" />
          </div>
        )}

        {channels.map((channel, index) => (
          <div
            key={index}
            className="flex flex-row justify-between w-full gap-12 lg:gap-4 sm:flex-col sm:gap-2 sm:justify-center sm:items-center min-w-min"
          >
            <ChannelCard
              channelName={channel.name}
              chnnelMembers={channel.membersCount}
              channelImage={imageUrl + channel.imagePath}
            />
            {channel.type === ChannelType.PROTECTED ? (
              <PasswordPopover
                onJoin={join}
                id={channel.id}
                channelName={channel.name}
                isLoading={isJoinLoading}
              />
            ) : (
              <button
                onClick={() => join(channel.id)}
                className="flex items-center justify-center w-24 h-10 rounded-lg bg-light-fg-link text-light-fg-tertiary min-w-min"
              >
                Join
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Communities;
