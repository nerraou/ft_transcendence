import Google from "@icons/outline/Google";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Google> = {
  title: "Icons/GoogleOutline",
  component: Google,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Google>;

export const Default: Story = {};
