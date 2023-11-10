import InputPassword from "@atoms/InputPassword";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof InputPassword> = {
  title: "Input/InputPassword",
  component: InputPassword,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof InputPassword>;

export const Default: Story = {
  args: {
    borderColor: "border-border-dark-fg-primary",
    iconColor: "stroke-dark-fg-primary",
    value: "Text input",
  },
};
