import EmptyStatePlaceholder from "@atoms/EmptyStatePlaceholder";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof EmptyStatePlaceholder> = {
  title: "profile/EmptyStatePlaceholder",
  component: EmptyStatePlaceholder,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof EmptyStatePlaceholder>;

export const Default: Story = {
  args: {},
};
