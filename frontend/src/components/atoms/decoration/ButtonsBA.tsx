function ButtonCircle() {
  return (
    <div className="relative w-14 h-14 rounded-full bg-light-fg-tertiary rotate-45">
      <div className="absolute flex justify-center items-center top-0 w-12 h-12 rounded-full bg-light-fg-secondary"></div>
    </div>
  );
}

function ButtonBA() {
  return (
    <div className="inline-flex justify-around h-20 w-52 -rotate-45 items-center bg-light-bg-secondary rounded-full border-4 border-light-fg-primary dark:border-dark-fg-primary">
      <ButtonCircle />
      <ButtonCircle />
    </div>
  );
}

export default ButtonBA;
