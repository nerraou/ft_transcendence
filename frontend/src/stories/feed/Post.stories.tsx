import Post from "@components/molecules/feed/Post";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof Post> = {
  title: "Feed/Post",
  component: Post,
  tags: ["autodcs"],
};

export default meta;

type Story = StoryObj<typeof Post>;

export const Default: Story = {
  args: {
    post: {
      id: "1",
      user: {
        name: "John Doe",
        avatar: "/default/user-circle.png",
      },
      content: "This is fun.",
      likes: 10,
      image: "/default/user-circle.png",
    },
    liked: false,
    onLike: () => {
      action("onLike");
    },
  },
};

export const LikedNoImage: Story = {
  args: {
    post: {
      id: "1",
      user: {
        name: "John Doe",
        avatar: "/default/user-circle.png",
      },
      content: "This is fun.",
      likes: 11,
    },
    liked: true,
    onLike: () => {
      action("onLike");
    },
  },
};
