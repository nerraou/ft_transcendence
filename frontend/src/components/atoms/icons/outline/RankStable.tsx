import React from "react";

interface RankStableProps {
  className?: string;
}

const RankStable: React.FC<RankStableProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="24"
      height="4"
      viewBox="0 0 24 4"
      fill="none"
    >
      <path
        d="M2 2H4.85714M19.1429 2H22M10.5714 2H13.4286"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RankStable;
