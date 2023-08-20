import Bar from "@atoms/decoration/Bar";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Bar> = {
  title: "Decoration/Bar",
  component: Bar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Bar>;

export const Default: Story = {
  args: {},
};
