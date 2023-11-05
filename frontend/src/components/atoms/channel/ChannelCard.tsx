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
      className="custom-position object-cover w-16 h-16 rounded-lg"
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
    <div className="flex gap-4 max-w-max bg-inherit">
      <ChannelImage image={props.channelImage ?? defaultImage} />
      <div className="flex flex-col gap-2">
        <label className="text-light-fg-link text-lg">
          #{props.channelName}
        </label>
        <label className="text-light-fg-link text-xs leading-none">
          {props.chnnelMembers} members
        </label>
      </div>
    </div>
  );
};

export default ChannelCard;
