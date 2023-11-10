import Save from "@icons/outline/Save";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Save> = {
  title: "Icons/SaveOutline",
  component: Save,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Save>;

export const Default: Story = {
  args: {},
};
