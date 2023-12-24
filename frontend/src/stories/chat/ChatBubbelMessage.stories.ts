import ChatBubbleMessage from "@atoms/chat/ChatBubbelMessage";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ChatBubbleMessage> = {
  title: "chat/ChatBubbleMessage",
  component: ChatBubbleMessage,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ChatBubbleMessage>;

export const Default: Story = {
  args: {
    message: "Hello I hope you are doing well",
    image: "/anime.jpg",
  },
};
