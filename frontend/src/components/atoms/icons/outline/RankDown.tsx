import React from "react";

interface Props {
  className?: string;
}

const RankDown: React.FC<Props> = ({ className }) => {
  return (
    <svg
      className={className}
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
    >
      <path
        d="M2.40039 2L9.06706 14L13.5115 6L22.4004 22M22.4004 22V8M22.4004 22H14.6226"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RankDown;
