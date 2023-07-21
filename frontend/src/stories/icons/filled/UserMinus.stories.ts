import UserMinus from "@icons/filled/UserMinus";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof UserMinus> = {
  title: "Icons/UserMinusFilled",
  component: UserMinus,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof UserMinus>;

export const Default: Story = {
  args: {
    color: "stroke-flashGreen",
    backgroundColor: "bg-secondary",
  },
};
