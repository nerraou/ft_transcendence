import SettingsTabs from "@organisms/SettingsTabs";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SettingsTabs> = {
  title: "Setting/SettingsTabs",
  component: SettingsTabs,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SettingsTabs>;

export const Default: Story = {
  args: {},
};
