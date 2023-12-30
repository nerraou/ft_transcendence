import User from "@components/atoms/chat/User";
import DeviceGamePad from "@components/atoms/icons/outline/DeviceGamePad";
import MenuDots from "@components/atoms/icons/outline/MenuDots";

interface ChatHeaderProps {
  status: "ONLINE" | "OFFLINE" | "IN_GAME";
  username: string;
  image: string;
}

function ChatHeader(props: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between py-3 px-8 sm:px-4 border-4 bg bg-light-fg-tertiary border-light-bg-tertiary rounded-tr-xl">
      <User
        username={props.username}
        avatarPath={props.image}
        status={props.status}
      />
      <div className="flex items-center space-x-5">
        <DeviceGamePad color="stroke-dark-fg-primary" />
        <MenuDots color="stroke-dark-fg-primary" />
      </div>
    </div>
  );
}

export default ChatHeader;
