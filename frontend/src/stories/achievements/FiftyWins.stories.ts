import FiftyWins from "@components/atoms/achievements/FiftyWins";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof FiftyWins> = {
  title: "Achievements/FiftyWins",
  component: FiftyWins,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof FiftyWins>;

export const Default: Story = {
  args: {},
};
