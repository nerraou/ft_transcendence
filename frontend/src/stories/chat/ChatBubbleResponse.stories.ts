import ChatBubbleResponse from "@atoms/chat/ChatBubbleResponse";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ChatBubbleResponse> = {
  title: "chat/ChatBubbleResponse",
  component: ChatBubbleResponse,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ChatBubbleResponse>;

export const Default: Story = {
  args: {
    message: "Hello I hope you are doing well",
    image: "/anime.jpg",
  },
};
