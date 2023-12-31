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
};
