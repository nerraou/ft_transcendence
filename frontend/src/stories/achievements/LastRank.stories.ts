import LastRanked from "@atoms/achievements/LastRanked";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof LastRanked> = {
  title: "Achievements/LastRanked",
  component: LastRanked,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof LastRanked>;

export const Default: Story = {
  args: {},
};
