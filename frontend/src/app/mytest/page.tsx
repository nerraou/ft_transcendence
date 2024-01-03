"use client";
import DatePickerInterval, {
  DateInterval,
} from "@components/atoms/DatePickerInterval";
import React from "react";

const DatePickerComponent: React.FC = () => {
  const [value, setValue] = React.useState<DateInterval | null | undefined>(
    null,
  );
  return (
    <div className="flex flex-col items-center justify-center">
      <DatePickerInterval onChange={setValue} value={value} />
    </div>
  );
};

export default DatePickerComponent;
