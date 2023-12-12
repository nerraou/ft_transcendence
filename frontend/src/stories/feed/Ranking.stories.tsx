import Ranking, { RankingProps } from "@components/molecules/feed/Ranking";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof Ranking> = {
  title: "Feed/Ladder-Ranking",
  component: Ranking,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Ranking>;

export const Default: Story = (args: RankingProps) => (
  <div style={{ width: "400px" }}>
    <Ranking {...args} />
  </div>
);

Default.args = {
  users: [
    {
      fullName: "Larbi El Hilali",
      username: "CE0",
    },
    {
      fullName: "Mahmoud zridi",
      username: "MrDrogon",
    },
    {
      fullName: "John Doe",
      username: "johndoe",
    },
  ],
  onViewMore: () => action("onViewMore"),
};
