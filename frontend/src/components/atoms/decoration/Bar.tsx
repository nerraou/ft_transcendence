function BarIcon() {
  return (
    <svg
      width="42"
      height="10"
      viewBox="0 0 42 10"
      className="fill-light-fg-primary dark:fill-dark-fg-primary"
    >
      <rect width="5" height="10" rx="2.5" transform="matrix(-1 0 0 1 5 0)" />
      <rect width="5" height="10" rx="2.5" transform="matrix(-1 0 0 1 14 0)" />
      <rect width="5" height="10" rx="2.5" transform="matrix(-1 0 0 1 23 0)" />
      <rect width="5" height="10" rx="2.5" transform="matrix(-1 0 0 1 32 0)" />
      <rect width="5" height="10" rx="2.5" transform="matrix(-1 0 0 1 41 0)" />
    </svg>
  );
}

function Bar() {
  return (
    <div className="flex justify-between">
      <BarIcon />
      <div className="bg-light-fg-primary dark:bg-dark-fg-primary rounded-full h-3 w-4/5" />
    </div>
  );
}

export default Bar;
