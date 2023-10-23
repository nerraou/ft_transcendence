import Post from "@components/atoms/feed/Post";
import { Meta, StoryObj } from "@storybook/react";

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
    onLike: () => {},
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
    onLike: () => {},
  },
};
