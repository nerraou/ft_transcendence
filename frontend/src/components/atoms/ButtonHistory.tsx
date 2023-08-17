import clsx from "clsx";
import ButtonContainer from "./ButtonContainer";

interface ButtonHistoryProps {
  backgroundColor: string;
  borderColor: string;
  textColor: string;
}

function History() {
  return (
    <button
      className={clsx(
        "w-20 h-20 rounded-full bg-light-fg-link border-4 border-light-bg-tertiary text-xl",
      )}
    >
      H
    </button>
  );
}
function ButtonHistory(props: ButtonHistoryProps) {
  return (
    <ButtonContainer
      borderColor={props.borderColor}
      backgroundColor={props.backgroundColor}
    >
      <History />
    </ButtonContainer>
  );
}

export default ButtonHistory;
