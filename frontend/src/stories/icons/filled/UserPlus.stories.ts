import UserPlus from "@icons/filled/UserPlus";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof UserPlus> = {
  title: "Icons/UserPlusFilled",
  component: UserPlus,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof UserPlus>;

export const Default: Story = {
  args: {
    color: "stroke-flashGreen",
    backgroundColor: "bg-secondary",
  },
};
