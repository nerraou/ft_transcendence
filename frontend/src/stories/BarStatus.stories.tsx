import BarStatus from "@atoms/BarStatus";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof BarStatus> = {
  title: "Bar/BarStatus",
  component: BarStatus,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof BarStatus>;

export const Default: Story = {
  args: {},
};
