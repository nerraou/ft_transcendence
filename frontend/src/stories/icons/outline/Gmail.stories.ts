import Gmail from "@icons/outline/Gmail";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Gmail> = {
  title: "Icons/GmailOutline",
  component: Gmail,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Gmail>;

export const Default: Story = {};
