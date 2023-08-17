import CircleButton from "@atoms/CircleButton";
import Icon42 from "@icons/outline/Icon42";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CircleButton> = {
  title: "Button/CircleButton",
  component: CircleButton,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CircleButton>;

export const Default: Story = {
  args: {
    icon: <Icon42 />,
    color: "bg-dark-bg-primary",
  },
};
