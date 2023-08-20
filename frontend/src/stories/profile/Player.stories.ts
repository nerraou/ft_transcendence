import Player from "@atoms/Player";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Player> = {
  title: "Profile/Player",
  component: Player,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Player>;

export const Default: Story = {
  args: {
    name: "noface",
  },
};
