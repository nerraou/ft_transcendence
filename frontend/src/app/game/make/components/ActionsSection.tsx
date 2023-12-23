import { MouseEventHandler, ReactNode } from "react";

import Restore from "@components/atoms/icons/outline/Restore";
import clsx from "clsx";

interface ActionsSectionProps {
  width: string;
  onReset: MouseEventHandler<HTMLButtonElement>;
  onPlay: MouseEventHandler<HTMLButtonElement>;
}

export default function ActionsSection(props: ActionsSectionProps) {
  return (
    <section className={clsx("flex flex-row justify-between", props.width)}>
      <ButtonContainer onClick={props.onReset}>
        <Restore height="h-16 sm:h-10" width="w-16 sm:w-10 " />
      </ButtonContainer>

      <ButtonContainer onClick={props.onPlay}>
        <span className="text-light-fg-primary text-xl sm:text-base">PLAY</span>
      </ButtonContainer>
    </section>
  );
}

interface ButtonContainerProps {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}

function ButtonContainer(props: ButtonContainerProps) {
  return (
    <button
      className={clsx(
        "flex items-center justify-center border-4 rounded-full w-32 h-32 border-light-fg-primary bg-light-accent",
        "sm:w-20 sm:h-20",
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
