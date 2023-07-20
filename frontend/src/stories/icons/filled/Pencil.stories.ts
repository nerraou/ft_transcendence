import Pencil from "@icons/filled/Pencil";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Pencil> = {
  title: "Icons/PencilFilled",
  component: Pencil,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Pencil>;

export const Default: Story = {
  args: {
    color: "stroke-flashGreen",
    backgroundColor: "bg-secondary",
  },
};
