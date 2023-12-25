import MenuDots from "@icons/outline/MenuDots";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof MenuDots> = {
  title: "Icons/MenuDotsOutline",
  component: MenuDots,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof MenuDots>;

export const Default: Story = {
  args: {
    color: "stroke-dark-fg-primary",
  },
};
