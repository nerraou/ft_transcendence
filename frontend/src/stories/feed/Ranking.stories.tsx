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
  <div className="w-96">
    <Ranking {...args} />
  </div>
);

Default.args = {
  users: [
    {
      id: 1,
      firstName: "Mahmoud",
      lastName: "zridi",
      username: "MrDrogon",
      ranking: 1,
      rating: 400,
      avatarPath: "/default/user-circle.png",
    },
    {
      id: 2,
      firstName: "John",
      lastName: "Doe",
      username: "jdoe",
      ranking: 2,
      rating: 399,
      avatarPath: "/default/user-circle.png",
    },
  ],
  onViewMore: () => action("onViewMore"),
};
