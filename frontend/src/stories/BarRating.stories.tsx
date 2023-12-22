import BarRating from "@atoms/BarRating";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof BarRating> = {
  title: "Bar/BarRating",
  component: BarRating,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof BarRating>;

export const Default: Story = {
  args: {
    rating: 98,
  },
};
