import clsx from "clsx";
import { RadioGroup } from "@headlessui/react";

const COLORS = ["#EF9935", "#E94635", "#FDEECD", "#7E2625"];

interface CustomizeGameSectionProps {
  scoreToWin: string;
  onScoreToWinChange: (value: string) => void;

  paddleColor: string;
  onPaddleColorChange: (color: string) => void;

  boardColor: string;
  onBoardColorChange: (color: string) => void;
}

export function CustomizeGameSection(props: CustomizeGameSectionProps) {
  return (
    <section className="mt-8">
      <Label text="Score To Win" />
      <SelectButtonGroup
        margin="mt-6"
        value={props.scoreToWin}
        onChange={props.onScoreToWinChange}
        values={["3", "5", "10", "15", "20"]}
      />

      <section
        className={clsx(
          "flex max-w-xl mt-8 justify-between",
          "sm:flex-col sm:gap-5",
        )}
      >
        <div>
          <Label text="Paddle Color" />
          <CircleColorGroup
            margin="mt-5"
            color={props.paddleColor}
            onChange={props.onPaddleColorChange}
            colors={COLORS}
          />
        </div>
        <div>
          <Label text="Board Color" />
          <CircleColorGroup
            margin="mt-5"
            color={props.boardColor}
            onChange={props.onBoardColorChange}
            colors={COLORS}
          />
        </div>
      </section>
    </section>
  );
}

interface LabelProps {
  text: string;
  margin?: string;
}

function Label(props: LabelProps) {
  return (
    <label
      className={clsx(
        "inline-block bg-light-bg-tertiary px-8 py-1 text-lg border border-light-fg-primary rounded-base",
        props.margin,
      )}
    >
      {props.text}
    </label>
  );
}

interface SelectButtonProps {
  text: string;
  selected: boolean;
}

function SelectButton(props: SelectButtonProps) {
  return (
    <button
      className={clsx("text-lg border-4 w-24 h-12 rounded-full", {
        "text-light-fg-primary border-light-fg-link": !props.selected,
        "text-light-fg-tertiary border-light-bg-tertiary bg-dark-fg-primary":
          props.selected,

        "dark:text-light-fg-tertiary dark:border-dark-accent": !props.selected,
        "dark:text-light-fg-tertiary dark:border-light-fg-tertiary dark:bg-dark-accent":
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

interface CircleColorProps {
  color: string;
  selected: boolean;
  selectedBackground: string;
}

function CircleColor(props: CircleColorProps) {
  return (
    <div
      className="flex justify-center items-center w-10 h-10 rounded-full hover:scale-110 transition-all"
      style={{
        backgroundColor: props.color,
      }}
    >
      <div
        className={clsx(
          "border-4 transition-all rounded-full",
          props.selectedBackground,
          {
            "w-9 h-9": props.selected,
            "w-0 h-0": !props.selected,
          },
        )}
        style={{
          borderColor: props.color,
        }}
      />
    </div>
  );
}

interface CircleColorGroupProps {
  color: string;
  onChange: (color: string) => void;
  colors: string[];
  margin?: string;
}

function CircleColorGroup(props: CircleColorGroupProps) {
  return (
    <RadioGroup
      className={clsx("flex space-x-3", props.margin)}
      value={props.color}
      onChange={props.onChange}
    >
      {props.colors.map((color, index) => {
        return (
          <RadioGroup.Option key={index} value={color}>
            {({ checked }) => (
              <CircleColor
                color={color}
                selected={checked}
                selectedBackground="bg-light-bg-primary dark:bg-dark-bg-primary"
              />
            )}
          </RadioGroup.Option>
        );
      })}
    </RadioGroup>
  );
}
