import clsx from "clsx";

interface HeadphonesProps {
  reverse?: boolean;
}

function Headphones(props: HeadphonesProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="130"
      height="21"
      viewBox="0 0 130 21"
      fill="none"
      className={clsx({ "rotate-180": props.reverse })}
    >
      <rect
        x="118"
        y="16"
        width="5"
        height="5"
        className="fill-light-fg-primary dark:fill-dark-fg-primary"
      />
      <rect
        x="109"
        y="16"
        width="5"
        height="5"
        className="fill-light-fg-primary dark:fill-dark-fg-primary"
      />
      <rect
        x="100"
        y="16"
        width="5"
        height="5"
        className="fill-light-fg-primary dark:fill-dark-fg-primary"
      />
      <rect
        x="2.5"
        y="2.5"
        width="125"
        height="11"
        rx="5.5"
        className="fill-light-bg-secondary stroke-light-fg-primary dark:stroke-dark-fg-primary dark:fill-dark-bg-secondary"
        strokeWidth="5"
      />
    </svg>
  );
}

export default Headphones;
