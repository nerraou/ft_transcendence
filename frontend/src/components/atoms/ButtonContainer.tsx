import clsx from "clsx";

interface ButtonContainerProps {
  backgroundColor: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

function ButtonContainer(props: ButtonContainerProps) {
  return (
    <div
      className={clsx(
        props.backgroundColor,
        "flex justify-center items-center w-36 h-36 sm:w-24 sm:h-24 rounded-full border-4 border-light-fg-primary dark:border-dark-fg-primary cursor-pointer",
      )}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}

export default ButtonContainer;
