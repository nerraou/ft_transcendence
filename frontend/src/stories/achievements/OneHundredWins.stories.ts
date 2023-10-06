import OneHundredWins from "@atoms/achievements/OneHundredWins";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof OneHundredWins> = {
  title: "Achievements/OneHundredWins",
  component: OneHundredWins,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof OneHundredWins>;

export const Default: Story = {
  args: {},
};
