import ButtonsStartSelect from "@atoms/decoration/ButtonsStartSelect";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ButtonsStartSelect> = {
  title: "Decoration/ButtonsStartSelect",
  component: ButtonsStartSelect,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ButtonsStartSelect>;

export const Default: Story = {
  args: {},
};
