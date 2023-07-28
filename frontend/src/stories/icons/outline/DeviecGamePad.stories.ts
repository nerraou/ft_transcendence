import DeviceGamePad from "@icons/outline/DeviceGamePad";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof DeviceGamePad> = {
  title: "Icons/DeviceGamePadOutline",
  component: DeviceGamePad,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DeviceGamePad>;

export const Default: Story = {
  args: {
    color: "stroke-light-fg-primary ",
  },
};
