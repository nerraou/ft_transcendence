import UserCard from "@components/molecules/feed/UserCard";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof UserCard> = {
  title: "Feed/UserCard",
  component: UserCard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof UserCard>;

export const Default: Story = {
  args: {
    fullName: "John Doe",
    username: "johndoe",
    image: "/default/user-circle.png",
  },
};
