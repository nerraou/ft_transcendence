import Headphones from "@atoms/decoration/Headphones";
import clsx from "clsx";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode | ReactNode[];
}

function DummyNavBar() {
  return (
    <header className="relative h-20 border-b-4 border-b-light-fg-primary dark:border-b-dark-fg-primary">
      <Headphones reverse position="absolute top-0 left-16" />
      <nav className="h-full border-l-4 border-l-light-fg-tertiary"></nav>
    </header>
  );
}

export default function Layout(props: LayoutProps) {
  return (
    <main className="relative flex min-h-screen p-4 bg-light-bg-primary dark:bg-dark-bg-primary">
      <section
        className={clsx(
          "relative container flex-1 flex flex-col mx-auto border-4 rounded-b-2xl",
          "border-light-fg-primary dark:border-dark-fg-primary",
        )}
      >
        <DummyNavBar />
        <section
          className={clsx(
            "flex-grow pb-10 bg-light-bg-primary dark:bg-dark-bg-primary",
            "relative h-full rounded-b-2xl border-t-4 border-l-4 border-light-fg-tertiary",
            "bg-[position:right_bottom_,_center_bottom,_left_-4px_bottom] bg-no-repeat",
            "bg-light-layout dark:bg-dark-layout",
          )}
        >
          {props.children}
        </section>
      </section>
    </main>
  );
}
