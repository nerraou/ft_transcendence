import SecondRanked from "@atoms/achievements/SecondRanked";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SecondRanked> = {
  title: "Achievements/SecondRanked",
  component: SecondRanked,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SecondRanked>;

export const Default: Story = {
  args: {},
};
