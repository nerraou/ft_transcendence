import UsersAdd from "@icons/outline/UsersAdd";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof UsersAdd> = {
  title: "Icons/UsersAdd",
  component: UsersAdd,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof UsersAdd>;

export const Default: Story = {
  args: {
    color: "stroke-light-fg-primary",
  },
};
