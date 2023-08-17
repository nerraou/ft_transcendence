import ButtonHistory from "@atoms/ButtonHistory";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ButtonHistory> = {
  title: "Button/ButtonHistory",
  component: ButtonHistory,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ButtonHistory>;

export const Default: Story = {
  args: {
    backgroundColor: "bg-light-bg-secondary",
  },
};
