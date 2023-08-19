import ToggleSwitch from "@components/atoms/ToggleSwitch";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ToggleSwitch> = {
  title: "Sttings/ToggleSwitch",
  component: ToggleSwitch,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ToggleSwitch>;

export const Default: Story = {
  args: {
    checked: false,
  },
};
