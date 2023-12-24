import DatePicker from "@components/atoms/DatePicker";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof DatePicker> = {
  title: "DatePicker/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      return (
        <div className="h-96">
          <Story />
        </div>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    value: new Date(),
  },
};
