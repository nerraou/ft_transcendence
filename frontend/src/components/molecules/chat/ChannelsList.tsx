import Channel, { ChannelProps } from "@components/atoms/chat/Channel";
import Add from "@components/atoms/icons/outline/Add";
import UsersAdd from "@components/atoms/icons/outline/UsersAdd";

const Channels: ChannelProps[] = [
  {
    name: "9wdnaha",
    image: "/totoro.jpg",
    usersNumber: 2,
  },
  {
    name: "AWDI",
    image: "/noface.jpg",
    usersNumber: 50,
  },
  {
    name: "Anna",
    image: "/anime.jpg",
    usersNumber: 1,
  },
];

function ChannelAddUser(props: ChannelProps) {
  return (
    <div className="flex justify-between items-center space-x-10">
      <Channel
        name={props.name}
        image={props.image}
        usersNumber={props.usersNumber}
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

function ChannelsList() {
  return (
    <div className="bg-light-fg-tertiary border-2 border-light-fg-primary rounded-lg p-4 space-y-4">
      <div className="flex justify-between px-4 py-2 bg-dark-bg-secondary border-2 border-light-fg-primary">
        <h3 className="text-lg text-light-bg-secondary">#CHANNELS</h3>
        <Add
          color="stroke-light-fg-primary"
          onClick={() => {
            return;
          }}
        />
      </div>
      <div className="space-y-4 px-3">
        {Channels.map((channel, index) => {
          return (
            <ChannelAddUser
              key={index}
              name={channel.name}
              image={channel.image}
              usersNumber={channel.usersNumber}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ChannelsList;
