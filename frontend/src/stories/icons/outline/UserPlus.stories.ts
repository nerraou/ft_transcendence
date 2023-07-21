import UserPlus from "@icons/outline/UserPlus";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof UserPlus> = {
  title: "Icons/UserPlusOutline",
  component: UserPlus,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof UserPlus>;

export const Default: Story = {
  args: {
    color: "stroke-flashGreen",
  },
};
