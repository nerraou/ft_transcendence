import TextInput from "@atoms/TextInput";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TextInput> = {
  title: "./TextInput",
  component: TextInput,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
	borderColor: "border-light-fg-secondary",
	value: "",
	placeholder: "name"
  },
};
