import ButtonPlay from "@atoms/ButtonPlay";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ButtonPlay> = {
  title: "Button/ButtonPlay",
  component: ButtonPlay,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ButtonPlay>;

export const Default: Story = {
  args: {
    backgroundColor: "bg-light-bg-secondary",
  },
};
