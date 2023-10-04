import InputSearch from "@components/atoms/InputSearch";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof InputSearch> = {
  title: "Components/atoms/InputSearch",
  component: InputSearch,
  tags: ["autodcs"],
};

export default meta;

type Story = StoryObj<typeof InputSearch>;

export const Default: Story = {
  args: {
    placeholder: "Search...",
    value: "",
    textColor: "text-red-500",
  },
};
