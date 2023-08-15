import UserBlock from "@icons/outline/UserBlock";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof UserBlock> = {
  title: "Icons/UserBlockOutline",
  component: UserBlock,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof UserBlock>;

export const Default: Story = {
  args: {
    color: "stroke-light-fg-primary",
  },
};
