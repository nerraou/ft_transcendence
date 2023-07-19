import Email from "@icons/filled/Email";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Email> = {
  title: "Icons/EmailFilled",
  component: Email,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Email>;

export const Default: Story = {
  args: {
    color: "stroke-flashGreen",
    backgroundColor: "bg-secondary",
  },
};
