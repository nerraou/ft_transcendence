import MenuDots from "@components/atoms/icons/outline/MenuDots";
import SearchChannelsList from "@components/molecules/chat/SearchChannelsList";
import SearchFriendsList from "@components/molecules/chat/SearchFriendsList";
import Image from "next/image";

interface SidePanelProps {
  image: string;
}

function UserHeader(props: SidePanelProps) {
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
      <MenuDots color=" stroke-light-bg-tertiary" />
    </div>
  );
}

function SidePanel(props: SidePanelProps) {
  return (
    <section className="space-y-10 h-full flex flex-col px-5 pt-3 pb-14 bg-light-bg-primary border-t-4 border-b-8 border-x-4 border-light-bg-tertiary rounded-bl-2xl rounded-tl-xl">
      <UserHeader image={props.image} />
      <SearchFriendsList />
      <SearchChannelsList />
    </section>
  );
}

export default SidePanel;
