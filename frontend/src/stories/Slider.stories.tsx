import Slider from "@atoms/Slider";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Slider> = {
  title: "Slider/Slider",
  component: Slider,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {},
};
