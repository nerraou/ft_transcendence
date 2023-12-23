import HistoryUserCard from "@components/molecules/history/HistoryUserCard";
import { Meta, StoryObj } from "@storybook/react";
import { HistoryUserCardProps } from "../../types/history";

const meta: Meta<typeof HistoryUserCard> = {
  title: "History/UserCard",
  component: HistoryUserCard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof HistoryUserCard>;

export const PlayerWinning: Story = (args: HistoryUserCardProps) => (
  <div className="w-28">
    <HistoryUserCard {...args} />
  </div>
);

PlayerWinning.args = {
  avatarPath: "/default/user-circle.png",
  username: "johndoe",
  ratingChange: 10,
  side: "player",
};

export const OpponentLosing: Story = (args: HistoryUserCardProps) => (
  <div className="w-28">
    <HistoryUserCard {...args} />
  </div>
);

OpponentLosing.args = {
  avatarPath: "/default/user-circle.png",
  username: "johndoe",
  ratingChange: -10,
  side: "opponent",
};
