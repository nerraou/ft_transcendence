import CircleButton from "@atoms/CircleButton";
import Save from "@components/atoms/icons/outline/Save";
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
    icon: <Save color="stroke-light-fg-tertiary" />,
  },
};
