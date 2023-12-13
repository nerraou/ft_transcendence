interface DoubleArrowRightProps {
  color?: string;
}

function DoubleArrowRight(props: DoubleArrowRightProps) {
  return (
    <svg
      className={props.color}
      viewBox="0 0 13 12"
      fill="none"
      width="13"
      height="12"
    >
      <path
        d="M1 1L6 6L1 11M7 1L12 6L7 11"
        stroke="#7E2625"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default DoubleArrowRight;
