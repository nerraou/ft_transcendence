import FirstFriend from "@atoms/achievements/FirstFriend";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof FirstFriend> = {
  title: "Achievements/FirstFriend",
  component: FirstFriend,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof FirstFriend>;

export const Default: Story = {
  args: {},
};
