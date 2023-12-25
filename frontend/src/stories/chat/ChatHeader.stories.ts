import ChatHeader from "@molecules/chat/ChatHeader";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ChatHeader> = {
  title: "chat/ChatHeader",
  component: ChatHeader,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ChatHeader>;

export const Default: Story = {
  args: {
    username: "noface",
    image: "/anime.jpg",
    status: "OFFLINE",
  },
};
