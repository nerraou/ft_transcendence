import DoubleArrowRight from "@components/atoms/icons/outline/DoubleArrowRight";
import React from "react";
import UserCard from "./UserCard";
import FirstRanked from "@components/atoms/achievements/FirstRanked";
import SecondRanked from "@components/atoms/achievements/SecondRanked";
import ThirdRanked from "@components/atoms/achievements/ThirdRanked";
import Loading from "@components/atoms/icons/outline/Loading";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  avatarPath: string;
  ranking: number;
  rating: number;
}

export interface RankingProps {
  users: User[];
  onViewMore: () => void;
  isLoading?: boolean;
}

const getRankIcon = (index: number) => {
  switch (index) {
    case 1:
      return <FirstRanked />;
    case 2:
      return <SecondRanked />;
    case 3:
      return <ThirdRanked />;
    default:
      return null;
  }
};

const Ranking = ({ users, onViewMore, isLoading }: RankingProps) => {
  const imageUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/assets/images/";

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
      {isLoading && (
        <div className="flex flex-row justify-center w-full">
          <Loading />
        </div>
      )}
      {users.map((user, index) => (
        <div key={index} className="flex flex-row justify-between w-full">
          <UserCard
            fullName={user.firstName + " " + user.lastName}
            username={user.username}
            image={imageUrl + user.avatarPath}
          />
          {getRankIcon(user.ranking)}
        </div>
      ))}
    </div>
  );
};

export default Ranking;
