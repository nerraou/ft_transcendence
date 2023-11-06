import FirstWin from "@atoms/achievements/FirstWin";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof FirstWin> = {
  title: "Achievements/FirstWin",
  component: FirstWin,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof FirstWin>;

export const Default: Story = {
  args: {},
};
