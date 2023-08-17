import Restore from "@icons/outline/Restore";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Restore> = {
  title: "Icons/RestoreOutline",
  component: Restore,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Restore>;

export const Default: Story = {
  args: {
    color: "stroke-light-fg-tertiary",
  },
};
