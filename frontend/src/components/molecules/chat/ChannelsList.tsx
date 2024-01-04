import { ChannelInformation } from "@app/chat/[[...username]]/page";
import Channel from "@components/atoms/chat/Channel";
import Add from "@components/atoms/icons/outline/Add";
import UsersAdd from "@components/atoms/icons/outline/UsersAdd";
import Link from "next/link";

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

function ChannelAddUser(props: ChannelAddUserProps) {
  return (
    <div className="flex justify-between items-center space-x-2 hover:bg-light-bg-tertiary cursor-pointer">
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
