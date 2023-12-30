import React from "react";

interface RankUpProps {
  className?: string;
}

const RankUp: React.FC<RankUpProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M2 22L8.66667 10L13.1111 18L22 2M22 2H14.2222M22 2V16"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RankUp;
