import User from "@atoms/chat/User";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof User> = {
  title: "chat/User",
  component: User,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof User>;

export const Default: Story = {
  args: {
    username: "noface",
    avatarPath: "/anime.jpg",
    status: "OFFLINE",
  },
};
