import Sun from "@icons/filled/Sun";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Sun> = {
  title: "Icons/Sun",
  component: Sun,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Sun>;

export const Default: Story = {
  args: {
    color: "fill-light-fg-primary",
  },
};
