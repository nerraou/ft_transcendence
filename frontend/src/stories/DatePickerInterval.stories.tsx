import DatePickerInterval from "@components/atoms/DatePickerInterval";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof DatePickerInterval> = {
  title: "DatePicker/DatePickerInterval",
  component: DatePickerInterval,
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

type Story = StoryObj<typeof DatePickerInterval>;

export const Default: Story = {
  args: {
    value: [new Date(), new Date()],
  },
};
