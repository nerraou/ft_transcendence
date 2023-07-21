import UserCheck from "@icons/filled/UserCheck";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof UserCheck> = {
  title: "Icons/UserCheckFilled",
  component: UserCheck,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof UserCheck>;

export const Default: Story = {
  args: {
    color: "stroke-flashGreen",
    backgroundColor: "bg-secondary",
  },
};
