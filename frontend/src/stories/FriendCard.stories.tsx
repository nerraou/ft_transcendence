import FriendCard from "@molecules/FriendCard";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof FriendCard> = {
  title: "Friends/FriendCard",
  component: FriendCard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof FriendCard>;

export const Default: Story = {
  args: {
    fullname: "Nouhayla Erraou",
    username: "totoro",
    level: 6,
  },
};
