import ThirdRanked from "@atoms/achievements/ThirdRanked";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ThirdRanked> = {
  title: "Achievements/ThirdRanked",
  component: ThirdRanked,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ThirdRanked>;

export const Default: Story = {
  args: {},
};
