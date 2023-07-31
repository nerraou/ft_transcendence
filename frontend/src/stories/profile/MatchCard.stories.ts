import MatchCard from "@components/molecules/profile/MatchCard";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof MatchCard> = {
  title: "profile/MatchCard",
  component: MatchCard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof MatchCard>;

export const Default: Story = {
  args: {
    player1: { name: "noface", image: "/noface.jpg", state: "win" },
    player2: { name: "totoro", image: "/totoro.jpg", state: "lose" },
  },
};
