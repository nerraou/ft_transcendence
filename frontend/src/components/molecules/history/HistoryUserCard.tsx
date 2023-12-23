import clsx from "clsx";
import { HistoryUserCardProps } from "../../../types/history";
import Image from "next/image";
import React from "react";

interface UserImageProps {
  image: string;
  ratingChange: number;
  side: string;
}

const UserImage = (props: UserImageProps) => {
  return (
    <div className="relative">
      <div
        className={clsx(
          "text-sm font-bold absolute top-0 z-10",
          props.ratingChange > 0
            ? "text-light-accent"
            : "text-light-fg-secondary",
          props.side === "opponent" ? "left-0" : "right-0",
        )}
      >
        {props.ratingChange >= 0 ? "+" : ""}
        {props.ratingChange}
      </div>
      <Image
        src={props.image}
        alt="Player Avatar"
        width="30"
        height="30"
        className="custom-position object-cover w-12 h-12 rounded-full p-2 pb-0 pt-3"
      />
    </div>
  );
};

const HistoryUserCard = (props: HistoryUserCardProps) => {
  return (
    <div className="flex flex-col gap-2 bg-inherit items-center">
      <UserImage
        image={props.avatarPath}
        ratingChange={props.ratingChange}
        side={props.side}
      />
      <div className="flex flex-col gap-[2px] items-center w-full">
        <label className="text-light-fg-tertiary text-sm border-2 border-light-fg-primary dark:border-dark-fg-primary rounded-base bg-light-fg-link px-1 min-w-full flex flex-col items-center">
          {props.username}
        </label>
        <div className="w-8 h-[6px] bg-light-fg-primary dark:bg-dark-fg-primary"></div>
      </div>
    </div>
  );
};

export default HistoryUserCard;
