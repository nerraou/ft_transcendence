import SignUp from "@molecules/authentication/SignUp";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SignUp> = {
  title: "authentication/SignUp",
  component: SignUp,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SignUp>;

export const Default: Story = {
  args: {},
};
