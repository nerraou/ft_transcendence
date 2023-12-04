import Loading from "@icons/outline/Loading";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Loading> = {
  title: "Icons/LoadingOutline",
  component: Loading,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Loading>;

export const Default: Story = {
  args: {},
};
