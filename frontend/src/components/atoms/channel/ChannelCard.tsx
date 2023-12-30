import Image from "next/image";
import React from "react";

interface ChannelImageProps {
  image: string;
}

const ChannelImage = (props: ChannelImageProps) => {
  return (
    <Image
      src={props.image}
      alt="channel image"
      width="50"
      height="50"
      className="object-cover w-16 h-16 rounded-lg"
    />
  );
};

interface ChannelCardProps {
  channelName: string;
  chnnelMembers: number;
  channelImage?: string;
}

const ChannelCard = (props: ChannelCardProps) => {
  const defaultImage = "/default/users-group.png";

  return (
    <div className="flex gap-4 max-w-max bg-inherit lg:flex-col lg:align-center lg:gap-2 lg:justify-center sm:flex-col sm:align-center sm:gap-2 sm:justify-center">
      <ChannelImage image={props.channelImage ?? defaultImage} />
      <div className="flex flex-col gap-2">
        <label
          className="sm:max-w-[150px] md:max-w-xs lg:max-w-[150px] xl:max-w-[100px] 2xl:w-[180px] text-light-fg-link text-lg lg:text-sm md:text-sm sm:text-sm overflow-hidden overflow-ellipsis whitespace-nowrap"
          title={props.channelName}
        >
          #{props.channelName}
        </label>
        <label className="text-light-fg-link text-xs leading-none overflow-hidden overflow-ellipsis whitespace-nowrap">
          {props.chnnelMembers} members
        </label>
      </div>
    </div>
  );
};

export default ChannelCard;
