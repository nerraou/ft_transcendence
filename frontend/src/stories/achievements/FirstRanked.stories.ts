import FirstRanked from "@atoms/achievements/FirstRanked";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof FirstRanked> = {
  title: "Achievements/FirstRanked",
  component: FirstRanked,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof FirstRanked>;

export const Default: Story = {
  args: {},
};
