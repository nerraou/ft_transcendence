import { Switch } from "@headlessui/react";
import clsx from "clsx";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

function ToggleSwitch(props: ToggleSwitchProps) {
  return (
    <Switch
      checked={props.checked}
      onChange={props.onChange}
      className={clsx(
        {
          "bg-light-pressed": props.checked,
          "bg-light-bg-tertiary": !props.checked,
        },
        "relative inline-flex p-1 w-20 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75",
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={clsx(
          {
            "translate-x-9": props.checked,
            "translate-x-0": !props.checked,
          },
          {
            "bg-light-pressed": !props.checked,
            "bg-light-bg-tertiary": props.checked,
          },
          "pointer-events-none inline-block h-9 w-9 transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out",
        )}
      />
    </Switch>
  );
}
export default ToggleSwitch;
