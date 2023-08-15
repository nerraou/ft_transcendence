import User from "@icons/outline/User";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof User> = {
  title: "Icons/UserOutline",
  component: User,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof User>;

export const Default: Story = {
  args: {
    color: "stroke-light-fg-primary",
  },
};
