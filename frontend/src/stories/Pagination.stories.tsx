import Pagination from "@components/atoms/Pagination";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Pagination> = {
  title: "Components/atoms/Pagination",
  component: Pagination,
  tags: ["autodcs"],
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    total: 100,
    page: 1,
  },
};
