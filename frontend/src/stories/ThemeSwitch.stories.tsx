import ThemeSwitch from "@components/atoms/ThemeSwitch";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ThemeSwitch> = {
  title: "ToggleSwitch/ThemeSwitch",
  component: ThemeSwitch,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ThemeSwitch>;

export const Default: Story = {
  args: {
    checked: false,
  },
};
