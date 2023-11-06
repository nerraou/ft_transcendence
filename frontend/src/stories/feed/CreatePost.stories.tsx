import CreatePost from "@molecules/feed/CreatePost";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CreatePost> = {
  title: "Feed/CreatePost",
  component: CreatePost,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CreatePost>;

export const Default: Story = {
  args: {},
};
