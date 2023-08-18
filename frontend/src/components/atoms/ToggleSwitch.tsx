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
          "bg-light-bg-primary": props.checked,
          "bg-light-fg-primary": !props.checked,
        },
        "relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75",
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
          "pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-light-fg-secondary shadow-lg ring-0 transition duration-200 ease-in-out",
        )}
      />
    </Switch>
  );
}
export default ToggleSwitch;
