import SignIn from "@molecules/authentication/SignIn";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SignIn> = {
  title: "authentication/SignIn",
  component: SignIn,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SignIn>;

export const Default: Story = {
  args: {},
};
