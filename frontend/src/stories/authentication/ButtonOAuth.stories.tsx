import ButtonOAuth from "@molecules/authentication/ButtonOAuth";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ButtonOAuth> = {
  title: "authentication/ButtonOAuth",
  component: ButtonOAuth,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ButtonOAuth>;

export const Default: Story = {
  args: {},
};
