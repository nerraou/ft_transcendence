import ChannelCard from "@components/atoms/channel/ChannelCard";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ChannelCard> = {
  title: "Components/atoms/channel/ChannelCard",
  component: ChannelCard,
  tags: ["autodcs"],
};

export default meta;

type Story = StoryObj<typeof ChannelCard>;

export const Default: Story = {
  args: {
    channelName: "channel name",
    chnnelMembers: 1,
  },
};
