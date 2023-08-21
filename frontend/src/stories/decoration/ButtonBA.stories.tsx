import ButtonsBA from "@atoms/decoration/ButtonsBA";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ButtonsBA> = {
  title: "Decoration/ButtonBA",
  component: ButtonsBA,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ButtonsBA>;

export const Default: Story = {
  args: {},
};
