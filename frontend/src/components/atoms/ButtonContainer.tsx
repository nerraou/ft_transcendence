import clsx from "clsx";

interface ButtonContainerProps {
  backgroundColor: string;
  borderColor: string;
  children?: React.ReactNode;
}

function ButtonContainer(props: ButtonContainerProps) {
  return (
    <div
      className={clsx(
        props.backgroundColor,
        props.borderColor,
        "flex justify-center items-center w-36 h-36 rounded-full border-4",
      )}
    >
      {props.children}
    </div>
  );
}

export default ButtonContainer;
