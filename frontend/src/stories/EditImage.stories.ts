import EditImage from "@molecules/Settings/EditImage";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof EditImage> = {
  title: "Setting/EditImage",
  component: EditImage,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof EditImage>;

export const Default: Story = {
  args: {},
};
