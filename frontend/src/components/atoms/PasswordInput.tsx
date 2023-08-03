"use client";

import { ChangeEvent } from "react";
import clsx from "clsx";
import Eye from "@icons/outline/Eye";

interface PasswordInputProps {
  value: string;
  borderColor: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function PasswordInput(props: PasswordInputProps) {
  return (
    <div
      className={clsx(
        props.borderColor,
        "border-2 rounded-full w-64 h-10 bg-light-bg-tertiary outline-none focus:border-light-bg-secondary",
        "flex justify-around box-border px-2 overflow-hidden",
      )}
    >
      <input
        type="password"
        placeholder="Password"
        value={props.value}
        onChange={props.onChange}
        className="bg-light-bg-tertiary w-full outline-none"
      />
      <Eye color="stroke-light-fg-primary" />
    </div>
  );
}

export default PasswordInput;
