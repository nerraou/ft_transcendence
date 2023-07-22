import ExternalLink from "@icons/outline/ExternalLink";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ExternalLink> = {
  title: "Icons/ExternalLinkOutline",
  component: ExternalLink,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ExternalLink>;

export const Default: Story = {
  args: {
    color: "stroke-secondary",
  },
};
