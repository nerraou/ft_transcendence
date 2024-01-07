import { Datepicker } from "@aliakbarazizi/headless-datepicker";
import clsx from "clsx";
import { format as formatDate } from "date-fns";

import ChevronLeft from "@icons/outline/ChevronLeft";
import ChevronRight from "@icons/outline/ChevronRight";

export type DateValue = Date | null | undefined;

export interface DatePickerProps {
  value: DateValue;
  onChange: (value: DateValue) => void;

  buttonHeight?: string;
}

function formatOutput(value: DateValue) {
  if (!value) {
    return <span className="inline-block w-2 mx-2 h-px bg-light-fg-primary" />;
  }

  return formatDate(value, "yyyy-MM-dd");
}

export default function DatePicker(props: DatePickerProps) {
  const headerClassName =
    "inline-flex items-center h-9 rounded-md px-2 bg-light-bg-tertiary text-light-fg-primary dark:bg-dark-bg-primary dark:text-light-bg-tertiary";

  return (
    <Datepicker value={props.value} onChange={props.onChange}>
      <Datepicker.Button
        action="open"
        className={clsx("text-light-fg-primary", props.buttonHeight)}
      >
        {formatOutput(props.value)}
      </Datepicker.Button>

      <Datepicker.Picker
        defaultType="day"
        className="bg-light-fg-tertiary dark:bg-dark-fg-primary p-4 rounded-lg shadow-md"
      >
        {({ monthName, year }) => (
          <>
            <header className="flex justify-between items-center mb-2">
              <Datepicker.Button
                action="prev"
                className="flex justify-center items-center rounded-full w-9 h-9 bg-light-bg-tertiary dark:bg-dark-bg-primary"
              >
                <ChevronLeft color="stroke-light-fg-primary dark:stroke-dark-bg-secondary" />
              </Datepicker.Button>
              <div>
                <span className={headerClassName}>{monthName}</span>{" "}
                <span className={headerClassName}>{year}</span>
              </div>
              <Datepicker.Button
                action="next"
                className="flex justify-center items-center rounded-full w-9 h-9 bg-light-bg-tertiary dark:bg-dark-bg-primary"
              >
                <ChevronRight color="stroke-light-fg-primary dark:stroke-dark-bg-secondary" />
              </Datepicker.Button>
            </header>

            <Datepicker.Items className="grid grid-cols-7 gap-1">
              {({ items }) =>
                items.map((item) => {
                  return (
                    <Datepicker.Item
                      key={item.key}
                      item={item}
                      action="close"
                      className={clsx("text-sm", {
                        // header style
                        "my-3": item.isHeader,
                        "text-light-fg-primary dark:text-dark-fg-tertiary":
                          item.isHeader,

                        // days style
                        "rounded-sm w-9 h-8": !item.isHeader,
                        "bg-light-bg-tertiary text-light-fg-primary dark:bg-dark-bg-primary dark:text-dark-fg-tertiary":
                          !item.isSelected && !item.isHeader,
                        "bg-light-bg-secondary text-light-bg-tertiary":
                          item.isSelected,

                        // today style
                        "!text-light-bg-secondary":
                          item.isToday && !item.isSelected,

                        // disabled style
                        "opacity-25": item.disabled,
                      })}
                    >
                      {item.isHeader ? item.text.substring(0, 2) : item.text}
                    </Datepicker.Item>
                  );
                })
              }
            </Datepicker.Items>
          </>
        )}
      </Datepicker.Picker>
    </Datepicker>
  );
}
