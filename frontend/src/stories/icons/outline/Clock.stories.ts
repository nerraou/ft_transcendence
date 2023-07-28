import Clock from "@icons/outline/Clock";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Clock> = {
  title: "Icons/ClockOutline",
  component: Clock,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Clock>;

export const Default: Story = {
  args: {
    color: "stroke-light-fg-primary",
  },
};
