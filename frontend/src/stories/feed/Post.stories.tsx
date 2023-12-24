import Post from "@components/molecules/feed/Post";
import { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const meta: Meta<typeof Post> = {
  title: "Feed/Post",
  component: Post,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  tags: ["autodocs"],
} as Meta;

export default meta;

type Story = StoryObj<typeof Post>;

export const Default: Story = {
  args: {
    post: {
      id: 1,
      createdAt: "2021-08-01T00:00:00.000Z",
      user: {
        name: "John Doe",
        avatar: "/default/user-circle.png",
      },
      content: "This is fun.",
      likes: 10,
      image: "/default/user-circle.png",
    },
    liked: false,
  },
};

export const LikedNoImage: Story = {
  args: {
    post: {
      id: 1,
      createdAt: "2021-08-01T00:00:00.000Z",
      user: {
        name: "John Doe",
        avatar: "/default/user-circle.png",
      },
      content: "This is fun.",
      likes: 11,
      image: null,
    },
    liked: true,
  },
};
