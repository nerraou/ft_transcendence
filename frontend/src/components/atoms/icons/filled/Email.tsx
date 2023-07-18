interface EmailProps {
  color: string;
  backgroundColor: string;
  onClick?: () => void;
}

function Email(props: EmailProps) {
  return (
    <div
      className={
        props.backgroundColor +
        " " +
        "w-8 h-8 rounded-lg inline-flex justify-center items-center"
      }
      onClick={props.onClick}
    >
      <svg
        className={props.color}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
        <path d="M3 7l9 6l9 -6"></path>
      </svg>
    </div>
  );
}
export default Email;
