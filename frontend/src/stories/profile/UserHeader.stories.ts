import UserHeader from "@molecules/profile/UserHeader";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof UserHeader> = {
  title: "Profile/UserHeader",
  component: UserHeader,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof UserHeader>;

export const Default: Story = {
  args: {
    fullname: "Nouhayla Erraou",
    username: "totoro",
    level: 6,
  },
};
