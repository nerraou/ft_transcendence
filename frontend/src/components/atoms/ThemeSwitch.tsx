import { Switch } from "@headlessui/react";
import clsx from "clsx";

import Sun from "@icons/filled/Sun";
import Moon from "@icons/filled/Moon";

interface ThemeSwitchProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  margin?: string;
  position?: string;
}

export default function ThemeSwtich(props: ThemeSwitchProps) {
  return (
    <Switch
      checked={props.checked}
      onChange={props.onChange}
      className={clsx(
        "relative inline-flex p-1 w-20 shrink-0 cursor-pointer rounded-full transition duration-700 ease-in-out",
        props.margin,
        props.position,
        {
          "bg-dark-fg-primary": props.checked,
          "bg-light-bg-tertiary": !props.checked,
        },
      )}
    >
      <div
        className={clsx(
          "relative h-6 w-6 transition duration-700 ease-in-out",
          {
            "translate-x-11": props.checked,
            "translate-x-0": !props.checked,
          },
        )}
      >
        <Sun
          color="fill-light-fg-tertiary"
          className={clsx(
            "absolute top-0 transition duration-700 ease-in-out",
            {
              "opacity-0 -rotate-180": !props.checked,
              "opacity-100": props.checked,
            },
          )}
        />

        <Moon
          color="fill-dark-fg-primary"
          className={clsx(
            "absolute top-0 transition duration-700 ease-in-out",
            {
              "opacity-100 -rotate-[360deg]": !props.checked,
              "opacity-0": props.checked,
            },
          )}
        />
      </div>
    </Switch>
  );
}
