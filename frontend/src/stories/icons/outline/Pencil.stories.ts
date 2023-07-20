import Pencil from "@icons/outline/Pencil";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Pencil> = {
  title: "Icons/PencilOutline",
  component: Pencil,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Pencil>;

export const Default: Story = {
  args: {
    color: "stroke-flashGreen",
  },
};
