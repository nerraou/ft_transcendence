import Check from "@icons/outline/Check";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Check> = {
  title: "Icons/CheckOutline",
  component: Check,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Check>;

export const Default: Story = {
  args: {},
};
