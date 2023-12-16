import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import RankingModal, {
  RankingModalProps,
} from "@components/molecules/feed/RankingModal";

const meta: Meta<typeof RankingModal> = {
  title: "Feed/RankingModal",
  component: RankingModal,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof RankingModal>;

export const Default: Story = (args: RankingModalProps) => (
  <RankingModal {...args} />
);

Default.args = {
  isOpen: true,
  onClose: () => action("onClose"),
  users: [
    {
      fullName: "Larbi El Hilali",
      username: "CE0",
      image: "/default/user-circle.png",
      points: 100,
      rank: 1,
    },
    {
      fullName: "Mahmoud zridi",
      username: "MrDrogon",
      image: "/default/user-circle.png",
      points: 99,
      rank: 2,
    },
    {
      fullName: "John Doe",
      username: "johndoe",
      image: "/default/user-circle.png",
      points: 80,
      rank: 3,
    },
  ],
  page: 1,
  onPageChange: () => action("onPageChange"),
  total: 100,
};
