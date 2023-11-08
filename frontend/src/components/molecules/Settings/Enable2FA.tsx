import ToggleSwitch from "@atoms/ToggleSwitch";

interface Enable2FAProps {
  onChange: (value: boolean) => void;
}

function Enable2FA(props: Enable2FAProps) {
  return (
    <div className="flex space-x-48">
      <label className="text-light-fg-primary  dark:text-light-fg-tertiary">
        Enable 2FA
      </label>
      <ToggleSwitch checked onChange={props.onChange} />
    </div>
  );
}

export default Enable2FA;
