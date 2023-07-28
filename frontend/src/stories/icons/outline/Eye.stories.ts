import Eye from "@icons/outline/Eye";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Eye> = {
  title: "Icons/EyeOutline",
  component: Eye,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Eye>;

export const Default: Story = {
  args: {
    color: "stroke-light-fg-primary ",
  },
};
