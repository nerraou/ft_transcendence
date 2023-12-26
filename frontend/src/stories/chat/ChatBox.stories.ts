import ChatBox from "@organisms/ChatBox";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ChatBox> = {
  title: "chat/ChatBox",
  component: ChatBox,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ChatBox>;

export const Default: Story = {
  args: {
    userImage: "/anime.jpg",
    message: "Hello How are you?",
    friendImage: "/totoro.jpg",
    response: "I am fine \n and you?",
  },
};
