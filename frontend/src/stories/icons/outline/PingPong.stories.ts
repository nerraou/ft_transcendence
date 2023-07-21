import PingPong from "@icons/outline/PingPong";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof PingPong> = {
  title: "Icons/PingPongOutline",
  component: PingPong,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof PingPong>;

export const Default: Story = {
  args: {
    color: "stroke-flashGreen",
  },
};
