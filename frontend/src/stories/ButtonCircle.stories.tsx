import ButtonCircle from "@components/atoms/ButtonCircle";
import Icon42 from "@icons/outline/Icon42";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ButtonCircle> = {
  title: "Button/ButtonCircle",
  component: ButtonCircle,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ButtonCircle>;

export const Default: Story = {
  args: {
    icon: <Icon42 />,
    color: "bg-dark-bg-primary",
  },
};
