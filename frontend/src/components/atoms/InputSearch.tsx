import clsx from "clsx";
import React, { ChangeEvent } from "react";
import Search from "@icons/outline/Search";
import X from "@icons/outline/X";

interface InputSearchProps {
  value: string;
  placeholder: string;
  textColor: string;
  width?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

const InputSearch = (props: InputSearchProps) => {
  const defaultWidth = "w-64";
  const width = props.width || defaultWidth;

  return (
    <div className={clsx("relative", width)}>
      <div className="absolute top-1/2 left-3 transform -translate-y-1/2">
        <Search className="text-light-fg-primary dark:text-dark-fg-primary" />
      </div>
      <input
        type="text"
        placeholder={props.placeholder}
        value={props.value}
        className={clsx(
          props.textColor,
          width,
          "h-10 border-2 rounded-full bg-light-bg-tertiary outline-none focus:border-dark-useless px-5 pl-12 pr-10 border-light-fg-primary dark:border-dark-bg-primary",
        )}
        onChange={props.onChange}
      />
      <button
        className="absolute top-1/2 right-3 transform -translate-y-1/2"
        onClick={props.onClear}
      >
        <X className="text-light-fg-primary dark:text-dark-fg-primary" />
      </button>
    </div>
  );
};

export default InputSearch;
