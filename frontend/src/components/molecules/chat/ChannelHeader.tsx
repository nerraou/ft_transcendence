import Channel from "@components/atoms/chat/Channel";
import MenuDots from "@components/atoms/icons/outline/MenuDots";

interface ChannelHeaderProps {
  image: string;
  channelName: string;
  channelDescription: string;
}

function ChannelHeader(props: ChannelHeaderProps) {
  return (
    <div className="flex items-center justify-between py-3 px-8 sm:px-4 border-4 bg bg-light-fg-tertiary border-light-bg-tertiary rounded-tr-xl">
      <Channel
        imagePath={props.image}
        name={props.channelName}
        description={props.channelDescription}
      />
      <MenuDots color="stroke-dark-fg-primary" />
    </div>
  );
}

export default ChannelHeader;
