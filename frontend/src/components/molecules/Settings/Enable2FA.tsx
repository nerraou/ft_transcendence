import ToggleSwitch from "@atoms/ToggleSwitch";

interface Enable2FAProps {
  onChange: (value: boolean) => void;
}

function Enable2FA(props: Enable2FAProps) {
  return (
    <div className="flex sm:justify-between space-x-52 xl:space-x-48 lg:space-x-40 md:space-x-24 sm:space-x-0">
      <label className="text-light-fg-primary dark:text-light-fg-tertiary">
        Enable 2FA
      </label>
      <ToggleSwitch checked onChange={props.onChange} />
    </div>
  );
}

export default Enable2FA;
