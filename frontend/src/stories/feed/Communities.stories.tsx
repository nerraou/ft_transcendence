import Communities, {
  CommunitiesProps,
} from "@components/molecules/feed/Communities";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ChannelType } from "@components/atoms/chat/ChannelForm";

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
      name: "1337",
      membersCount: 1,
      imagePath: "/default/users-group.png",
      creatorId: 1,
      description: "this is a description",
      type: ChannelType.PUBLIC,
    },
    {
      id: 2,
      name: "CPC",
      membersCount: 1,
      imagePath: "/default/users-group.png",
      creatorId: 1,
      description: "this is a description",
      type: ChannelType.PUBLIC,
    },
    {
      id: 3,
      name: "Ft_transcendence",
      membersCount: 1,
      imagePath: "/default/users-group.png",
      creatorId: 1,
      description: "this is a description",
      type: ChannelType.PUBLIC,
    },
  ],
  query: "",
  onSearchChange: () => {
    action("onSearchChange");
  },
  onSearchClear: () => {
    action("onSearchClear");
  },
};
