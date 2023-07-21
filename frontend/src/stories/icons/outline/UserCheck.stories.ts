import UserCheck from "@icons/outline/UserCheck";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof UserCheck> = {
  title: "Icons/UserCheckOutline",
  component: UserCheck,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof UserCheck>;

export const Default: Story = {
  args: {
    color: "stroke-flashGreen",
  },
};
