import InputText from "@atoms/InputText";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof InputText> = {
  title: "Input/InputText",
  component: InputText,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof InputText>;

export const Default: Story = {
  args: {
    borderColor: "border-border-dark-fg-primary",
    value: "",
    placeholder: "name",
  },
};
