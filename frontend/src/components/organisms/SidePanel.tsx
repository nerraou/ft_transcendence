import MenuDots from "@components/atoms/icons/outline/MenuDots";
import SearchChannelsList from "@components/molecules/chat/SearchChannelsList";
import SearchFriendsList from "@components/molecules/chat/SearchFriendsList";
import Image from "next/image";

interface SidePanelProps {
  image: string;
  token: string | unknown;
  onChannelClick: (channelId: number) => void;
  channelId: number;
}

interface UserHeaderProps {
  image: string;
}

function UserHeader(props: UserHeaderProps) {
  return (
    <div className="flex justify-between items-center border-2 border-light-bg-tertiary rounded-lg bg-light-fg-secondary py-3 px-5">
      <div className="relative shrink-0 w-16 h-16">
        <Image
          src={props.image}
          alt="user image"
          fill
          sizes="w-16 h-16"
          className="rounded-md object-cover appearance-none"
        />
      </div>
      <MenuDots color="stroke-light-bg-tertiary" />
    </div>
  );
}

function SidePanel(props: SidePanelProps) {
  return (
    <section className="scrollbar-thin scrollbar-track-light-fg-tertiary scrollbar-thumb-light-fg-primary space-y-10 h-full sm:h-[80vh] overflow-auto sm:w-5/6 w-full flex flex-col px-5 pt-3 pb-14 bg-light-bg-primary border-4 border-light-bg-tertiary rounded-bl-2xl rounded-tl-xl">
      <UserHeader image={props.image} />
      <SearchFriendsList token={props.token} />
      <SearchChannelsList
        onChannelClick={props.onChannelClick}
        channelId={props.channelId}
        token={props.token}
      />
    </section>
  );
}

export default SidePanel;
