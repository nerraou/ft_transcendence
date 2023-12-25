import DatePicker, { DateValue } from "@atoms/DatePicker";
import Calendar from "@icons/outline/Calendar";

export type DateInterval = [DateValue, DateValue];

interface DatePickerIntervalProps {
  value: DateInterval | null | undefined;

  onChange: (value: DateInterval) => void;
}

function getStartValue(value: DateInterval | null | undefined) {
  if (value && value.length >= 1) {
    return value[0];
  }
}

function getEndValue(value: DateInterval | null | undefined) {
  if (value && value.length == 2) {
    return value[1];
  }
}

export default function DatePickerInterval(props: DatePickerIntervalProps) {
  function startDateChangeHandler(value: DateValue) {
    let endDate: DateValue;

    if (props.value && props.value.length == 2) {
      endDate = props.value[1];
    }

    props.onChange([value, endDate]);
  }

  function endDateChangeHandler(value: DateValue) {
    let startDate: DateValue;

    if (props.value && props.value.length >= 1) {
      startDate = props.value[0];
    }

    props.onChange([startDate, value]);
  }

  return (
    <div className="inline-flex w-80 items-center border-2 border-light-fg-primary bg-light-fg-tertiary rounded-full px-4 h-10">
      <Calendar color="stroke-light-fg-primary" margin="mr-2" />
      <div className="flex h-full items-center flex-grow justify-evenly">
        <DatePicker
          buttonHeight="flex items-center min-h-full"
          value={getStartValue(props.value)}
          onChange={startDateChangeHandler}
        />
        <span className="inline-block w-1 mx-2 h-px bg-light-fg-primary" />
        <DatePicker
          buttonHeight="flex items-center min-h-full"
          value={getEndValue(props.value)}
          onChange={endDateChangeHandler}
        />
      </div>
    </div>
  );
}
