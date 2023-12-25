import clsx from "clsx";
import { RadioGroup } from "@headlessui/react";

interface SelectButtonProps {
  text: string;
  selected: boolean;
}

function SelectButton(props: SelectButtonProps) {
  return (
    <button
      className={clsx("text-lg border-4 w-36 h-12 rounded-full", {
        "text-light-fg-primary border-light-fg-link": !props.selected,
        "text-light-fg-tertiary border-light-bg-tertiary bg-light-fg-primary":
          props.selected,
      })}
    >
      {props.text}
    </button>
  );
}

interface SelectButtonGroupProps {
  value: string;
  values: string[];
  margin?: string;
  onChange: (value: string) => void;
}

function SelectButtonGroup(props: SelectButtonGroupProps) {
  return (
    <RadioGroup
      className={clsx("flex flex-wrap gap-5", props.margin)}
      value={props.value}
      onChange={props.onChange}
    >
      {props.values.map((value) => {
        return (
          <RadioGroup.Option key={value} value={value}>
            {({ checked }) => <SelectButton selected={checked} text={value} />}
          </RadioGroup.Option>
        );
      })}
    </RadioGroup>
  );
}

interface LabelSelectButtonGroupProps {
  labelValue: string;
  value: string;
  onChange: (value: string) => void;
}

function LabelSelectButtonGroup(props: LabelSelectButtonGroupProps) {
  return (
    <div className="flex lg:flex-col md:flex-col sm:flex-col space-x-32 lg:space-x-0 md:space-x-0 sm:space-x-0">
      <div className="w-56 xl:w-64">
        <label className="text-dark-bg-primary text-lg ">
          {props.labelValue}
        </label>
      </div>

      <SelectButtonGroup
        value={props.value}
        values={["public", "private", "protected"]}
        onChange={props.onChange}
      />
    </div>
  );
}

export default LabelSelectButtonGroup;
