import TFAModal from "@molecules/Settings/TFAModal";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TFAModal> = {
  title: "setting/TFAModal",
  component: TFAModal,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TFAModal>;

export const Default: Story = {
  args: {
    isOpen: false,
    OnClose: () => {
      return;
    },
  },
};
