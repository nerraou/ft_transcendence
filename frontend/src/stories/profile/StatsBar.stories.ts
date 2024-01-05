import StatsBar from "@components/molecules/profile/StatsBar";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof StatsBar> = {
  title: "profile/StatsBar",
  component: StatsBar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof StatsBar>;

export const Default: Story = {
  args: {
    wins: 100,
    losses: 25,
    lossesPercentage: 25,
    winsPercentage: 100,
  },
};
