import Add from "@icons/outline/Add";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Add> = {
  title: "Icons/Add",
  component: Add,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Add>;

export const Default: Story = {
  args: {
    color: "stroke-light-fg-primary",
  },
};
