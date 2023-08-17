import ButtonContainer from "./ButtonContainer";

interface ButtonHistoryProps {
  backgroundColor: string;
}

function History() {
  return (
    <button className="w-20 h-20 rounded-full bg-light-fg-link border-4 border-light-bg-tertiary ">
      <label className="text-xl text-light-fg-primary drop-shadow-sm">H</label>
    </button>
  );
}

function ButtonHistory(props: ButtonHistoryProps) {
  return (
    <ButtonContainer backgroundColor={props.backgroundColor}>
      <History />
    </ButtonContainer>
  );
}

export default ButtonHistory;
