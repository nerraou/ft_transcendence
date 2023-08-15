import BarStatus from "@atoms/BarStatus";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof BarStatus> = {
  title: "Icons/BarStatus",
  component: BarStatus,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof BarStatus>;

export const Default: Story = {
  args: {
    width: "w-2/3",
  },
};
