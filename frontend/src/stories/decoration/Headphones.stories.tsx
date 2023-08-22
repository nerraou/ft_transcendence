import Headphones from "@atoms/decoration/Headphones";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Headphones> = {
  title: "Decoration/Headphones",
  component: Headphones,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Headphones>;

export const Default: Story = {
  args: {
    reverse: false,
  },
};
