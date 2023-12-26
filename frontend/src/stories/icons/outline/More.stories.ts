import More from "@icons/outline/More";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof More> = {
  title: "Icons/More",
  component: More,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof More>;

export const Default: Story = {
  args: {
    color: "stroke-light-fg-primary",
  },
};
