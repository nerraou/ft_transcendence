import User from "@atoms/user-header/User";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof User> = {
  title: "user-header/User",
  component: User,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof User>;

export const Default: Story = {
  args: {
    fullName: "Nouhayla Erraou",
    username: "totoro",
    image: "/totoro.jpg",
  },
};
