import FiveWins from "@atoms/achievements/FiveWins";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof FiveWins> = {
  title: "Achievements/FiveWins",
  component: FiveWins,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof FiveWins>;

export const Default: Story = {
  args: {},
};
