import clsx from "clsx";
import React, { ChangeEvent } from "react";
import Search from "@icons/outline/Search";
import X from "@icons/outline/X";

interface InputSearchProps {
  value: string;
  placeholder: string;
  textColor: string;
  width?: string;
  bgColor?: string;
  borderColor?: string;
  iconsColor?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

const InputSearch = (props: InputSearchProps) => {
  const defaultWidth = "w-64";
  const defaultBgColor = "bg-light-bg-tertiary";
  const defaultBorderColor =
    "border-light-fg-primary dark:border-dark-bg-primary";
  const defaultIconsColor = "text-light-fg-primary dark:text-dark-fg-primary";

  const width = props.width || defaultWidth;
  const color = props.bgColor || defaultBgColor;
  const borderColor = props.borderColor || defaultBorderColor;
  const iconsColor = props.iconsColor || defaultIconsColor;

  return (
    <div className={clsx("relative", width)}>
      <div className="absolute top-1/2 left-3 transform -translate-y-1/2">
        <Search className={iconsColor} />
      </div>
      <input
        value={props.value}
        type="text"
        placeholder={props.placeholder}
        className={clsx(
          color,
          borderColor,
          props.textColor,
          "h-10 border-2 rounded-full outline-none focus:border-dark-useless px-5 pl-12 pr-10 w-full",
        )}
        onChange={props.onChange}
      />
      <button
        className="absolute top-1/2 right-3 transform -translate-y-1/2"
        onClick={props.onClear}
      >
        <X className={iconsColor} />
      </button>
    </div>
  );
};

export default InputSearch;
