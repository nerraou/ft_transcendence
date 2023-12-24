import CreatePost from "@molecules/feed/CreatePost";
import { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const meta: Meta<typeof CreatePost> = {
  title: "Feed/CreatePost",
  component: CreatePost,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CreatePost>;

export const Default: Story = {
  args: {},
};
