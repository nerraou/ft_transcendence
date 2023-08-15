import Reflect from "@icons/outline/Reflect";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Reflect> = {
  title: "Icons/ReflectOutline",
  component: Reflect,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Reflect>;

export const Default: Story = {
  args: {},
};
