"use client";

import useTheme from "@hooks/useTheme";
import clsx from "clsx";
import { ReactNode } from "react";

interface LayoutAuthProps {
  children: ReactNode | ReactNode[];
}

function LayoutAuth(props: LayoutAuthProps) {
  useTheme();

  return (
    <main className="relative flex min-h-screen p-4 bg-light-bg-tertiary dark:bg-dark-bg-primary">
      <section
        className={clsx(
          "relative container flex-1 flex flex-col mx-auto border-4 rounded-b-2xl",
          "border-light-fg-primary dark:border-dark-fg-primary",
        )}
      >
        <section
          className={clsx(
            "flex-grow pb-10 bg-light-bg-tertiary dark:bg-dark-bg-primary",
            "relative h-full rounded-b-2xl",
            "bg-[position:right_bottom_,_center_bottom] bg-no-repeat",
            "bg-light-layout-auth dark:bg-dark-layout-auth sm:bg-none dark:sm:bg-none",
          )}
        >
          {props.children}
        </section>
      </section>
    </main>
  );
}

export default LayoutAuth;
