import GameHistoryBrief from "@organisms/GameHistoryBrief";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof GameHistoryBrief> = {
  title: "profile/GameHistoryBrief",
  component: GameHistoryBrief,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof GameHistoryBrief>;

export const Default: Story = {
  args: {
    profileOwner: { name: "noha", image: "/tree.jpeg" },
    results: [
      { name: "totoro", state: "lose", image: "/totoro.jpeg" },
      { name: "noface", state: "win", image: "/noface.jpeg" },
      { name: "noface", state: "lose", image: "/noface.jpeg" },
      { name: "totoro", state: "win", image: "/totoro.jpeg" },
    ],
  },
};
