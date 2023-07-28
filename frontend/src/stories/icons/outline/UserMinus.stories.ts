import UserMinus from "@icons/outline/UserMinus";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof UserMinus> = {
  title: "Icons/UserMinusOutline",
  component: UserMinus,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof UserMinus>;

export const Default: Story = {
  args: {
    color: "stroke-light-fg-primary ",
  },
};
