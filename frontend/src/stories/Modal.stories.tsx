import Modal from "@atoms/Modal";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Modal> = {
  title: "Modal/Modal",
  component: Modal,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    title: "Title",
    description: "This is description",
  },
};
