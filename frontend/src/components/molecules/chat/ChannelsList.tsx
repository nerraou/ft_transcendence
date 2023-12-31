import Channel from "@components/atoms/chat/Channel";
import Add from "@components/atoms/icons/outline/Add";
import UsersAdd from "@components/atoms/icons/outline/UsersAdd";

export interface ChannelProps {
  id: number;
  name: string;
  imagePath: string;
  description?: string;
  membersCount?: number;
  type?: "PUBLIC";
}

interface ChannelAddUserProps {
  id?: number;
  name: string;
  imagePath: string;
  description?: string;
  membersCount?: number;
  type?: "PUBLIC";
}

interface ChannelsListProps {
  channels: ChannelProps[];
  channelId: number | undefined;
  onChannelClick: (channelId: number) => void;
}

function ChannelAddUser(props: ChannelAddUserProps) {
  return (
    <div className="flex justify-between items-center space-x-2 hover:bg-light-bg-tertiary cursor-pointer">
      <Channel
        name={props.name}
        imagePath={props.imagePath}
        membersCount={props.membersCount}
      />
      <UsersAdd
        color="stroke-light-fg-primary"
        onClick={() => {
          return;
        }}
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
        <Add
          color="stroke-light-fg-primary"
          onClick={() => {
            return;
          }}
        />
      </div>
      <div className="space-y-4 px-3 scrollbar-thin h-56 overflow-auto scrollbar-thumb-light-fg-primary">
        {props.channels.map((channel) => {
          return (
            <div
              key={channel.id}
              onClick={() => {
                props.onChannelClick(channel.id);
              }}
            >
              <ChannelAddUser
                name={channel.name}
                imagePath={imageUrl + channel.imagePath}
                membersCount={channel.membersCount}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChannelsList;
