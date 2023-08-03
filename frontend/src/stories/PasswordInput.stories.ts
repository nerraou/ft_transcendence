import PasswordInput from "@atoms/PasswordInput";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof PasswordInput> = {
  title: "./PasswordInput",
  component: PasswordInput,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  args: {
	borderColor: "border-light-fg-secondary",
	value: "Text input",
  },
};
