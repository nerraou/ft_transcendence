import EyeOff from "@icons/outline/EyeOff";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof EyeOff> = {
  title: "Icons/EyeOffOutline",
  component: EyeOff,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof EyeOff>;

export const Default: Story = {
  args: {
    color: "stroke-light-fg-primary ",
  },
};
