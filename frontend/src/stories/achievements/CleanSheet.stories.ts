import CleanSheet from "@atoms/achievements/CleanSheet";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CleanSheet> = {
  title: "Achievements/CleanSheet",
  component: CleanSheet,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CleanSheet>;

export const Default: Story = {
  args: {},
};
