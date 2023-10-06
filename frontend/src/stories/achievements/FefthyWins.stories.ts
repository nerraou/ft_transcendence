import FefthyWins from "@atoms/achievements/FefthyWins";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof FefthyWins> = {
  title: "Achievements/FefthyWins",
  component: FefthyWins,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof FefthyWins>;

export const Default: Story = {
  args: {},
};
