import InputSearch from "@components/atoms/InputSearch";
import ChannelCard from "@components/atoms/channel/ChannelCard";
import React from "react";

export interface Channel {
  id: string | number;
  channelName: string;
  channelMembers: number;
  channelImage: string;
}

export interface CommunitiesProps {
  channels: Channel[];
  onJoin: (id: string | number) => void;
  query: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClear: () => void;
}

const Communities = ({
  channels,
  onJoin,
  query,
  onSearchChange,
  onSearchClear,
}: CommunitiesProps) => {
  return (
    <div className="flex flex-col align-start w-full gap-8 p-8 rounded-lg border border-light-fg-link bg-light-bg-tertiary dark:bg-dark-fg-tertiary dark:border-dark-fg-primary">
      <div className="flex flex-row justify-between w-full">
        <p className="text-light-fg-primary text-xl lg:text-lg md:text-md sm:text-lg">#Communities</p>
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
        {channels.map((channel, index) =>  (
          <div
            key={index}
            className="flex flex-row justify-between w-full gap-12 lg:gap-4 sm:flex-col sm:gap-2 sm:justify-center sm:items-center min-w-min"
          >
            <ChannelCard
              channelName={channel.channelName}
              chnnelMembers={channel.channelMembers}
              channelImage={channel.channelImage}
            />
            <button
              onClick={() => onJoin(channel.id)}
              className="flex items-center justify-center w-24 h-10 rounded-lg bg-light-fg-link text-light-fg-tertiary min-w-min"
            >
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Communities;
