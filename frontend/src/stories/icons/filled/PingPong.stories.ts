import PingPong from "@icons/filled/PingPong";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof PingPong> = {
  title: "Icons/PingPongFilled",
  component: PingPong,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof PingPong>;

export const Default: Story = {
  args: {
    color: "stroke-flashGreen",
    backgroundColor: "bg-secondary",
  },
};
