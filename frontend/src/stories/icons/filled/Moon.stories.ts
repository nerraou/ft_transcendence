import Moon from "@icons/filled/Moon";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Moon> = {
  title: "Icons/Moon",
  component: Moon,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Moon>;

export const Default: Story = {
  args: {
    color: "fill-light-fg-primary",
  },
};
