import StatsBar from "@components/molecules/profile/StatsBar";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof StatsBar> = {
  title: "player/StatsBar",
  component: StatsBar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof StatsBar>;

export const Default: Story = {
  args: {
    wins: 45,
    losses: 55,
    matches: 100,
  },
};
