import Communities, {
  CommunitiesProps,
} from "@components/molecules/feed/Communities";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof Communities> = {
  title: "Feed/Communities",
  component: Communities,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Communities>;

export const Default: Story = (args: CommunitiesProps) => (
  <div className="w-max">
    <Communities {...args} />
  </div>
);

Default.args = {
  channels: [
    {
      id: 1,
      channelName: "1337",
      channelMembers: 1,
      channelImage: "/default/users-group.png",
    },
    {
      id: 2,
      channelName: "CPC",
      channelMembers: 1,
      channelImage: "/default/users-group.png",
    },
    {
      id: 3,
      channelName: "Ft_transcendence",
      channelMembers: 1,
      channelImage: "/default/users-group.png",
    },
  ],
  onJoin: () => {
    action("onJoin");
  },
  query: "",
  onSearchChange: () => {
    action("onSearchChange");
  },
  onSearchClear: () => {
    action("onSearchClear");
  },
};
