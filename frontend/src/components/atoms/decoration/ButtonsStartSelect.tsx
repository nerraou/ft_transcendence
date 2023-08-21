function Button() {
  return (
    <div className="flex justify-center items-center flex-col -rotate-45">
      <div className="h-6 w-20 flex justify-center items-center bg-light-fg-link m-1 rounded-xl border-light-fg-primary dark:border-dark-fg-primary border-2"></div>
      <div className="bg-light-fg-primary dark:bg-dark-fg-primary h-1.5 w-8"></div>
    </div>
  );
}

function ButtonStartSelect() {
  return (
    <div className="inline-flex">
      <Button />
      <Button />
    </div>
  );
}

export default ButtonStartSelect;
