import DoubleArrowRight from "@components/atoms/icons/outline/DoubleArrowRight";
import React from "react";
import UserCard from "./UserCard";
import FirstRanked from "@components/atoms/achievements/FirstRanked";
import SecondRanked from "@components/atoms/achievements/SecondRanked";
import ThirdRanked from "@components/atoms/achievements/ThirdRanked";

export interface User {
  fullName: string;
  username: string;
  image: string;
}

export interface RankingProps {
  users: User[];
  onViewMore: () => void;
}

const getRankIcon = (index: number) => {
  switch (index) {
    case 0:
      return <FirstRanked />;
    case 1:
      return <SecondRanked />;
    case 2:
      return <ThirdRanked />;
    default:
      return null;
  }
};

const Ranking = ({ users, onViewMore }: RankingProps) => {
  return (
    <div className="flex flex-col align-start w-full gap-8 p-8 rounded-lg border border-light-fg-link bg-light-bg-tertiary dark:bg-dark-fg-tertiary dark:border-dark-fg-primary">
      <div className="flex flex-row justify-between w-full">
        <p className="text-light-fg-primary text-xl lg:text-lg md:text-md sm:text-base">
          Top Players
        </p>
        <button
          className="flex flex-row items-center gap-2"
          onClick={() => onViewMore()}
        >
          <DoubleArrowRight color="text-light-fg-primary" />
        </button>
      </div>
      {users.map((user, index) => (
        <div key={index} className="flex flex-row justify-between w-full">
          <UserCard
            fullName={user.fullName}
            username={user.username}
            image={user.image}
          />
          {getRankIcon(index)}
        </div>
      ))}
    </div>
  );
};

export default Ranking;
