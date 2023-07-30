import Player from "@atoms/match-card/Player";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Player> = {
  title: "math-card/Player",
  component: Player,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Player>;

export const Default: Story = {
  args: {
    name: "noface",
    image: "/totoro.jpg",
    state: "win",
  },
};
