import InputChat from "@atoms/InputChat";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof InputChat> = {
  title: "Input/InputChat",
  component: InputChat,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof InputChat>;

export const Default: Story = {
  args: {},
};
