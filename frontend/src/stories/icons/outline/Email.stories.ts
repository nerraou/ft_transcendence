import Email from "@icons/outline/Email";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Email> = {
  title: "Icons/EmailOutline",
  component: Email,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Email>;

export const Default: Story = {
  args: {
    color: "stroke-light-fg-primary ",
  },
};
