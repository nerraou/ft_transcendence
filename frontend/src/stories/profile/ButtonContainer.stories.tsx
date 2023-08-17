import ButtonContainer from "@atoms/ButtonContainer";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ButtonContainer> = {
  title: "Button/ButtonContainer",
  component: ButtonContainer,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ButtonContainer>;

export const Default: Story = {
  args: {
    backgroundColor: "bg-light-pressed",
  },
};
