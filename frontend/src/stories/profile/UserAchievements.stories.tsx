import UserAchievements from "@molecules/profile/UserAchievements";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof UserAchievements> = {
  title: "profile/UserAchievements",
  component: UserAchievements,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof UserAchievements>;

export const Default: Story = {
  args: {
    achievements: [
      "CleanSheet",
      "Clean",
      "Clea",
      "Cle",
      "Cl",
      "FirstWin",
      "FiveWins",
      "OneHundredWins",
      "FirstRanked",
      "SecondRanked",
      "ThirdRanked",
      "LastRanked",
    ],
  },
};
