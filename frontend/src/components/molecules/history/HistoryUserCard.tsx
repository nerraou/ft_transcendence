import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
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
          "text-sm font-bold absolute top-1 z-10",
          props.ratingChange > 0
            ? "text-light-accent"
            : "text-light-fg-secondary",
          props.side === "opponent" ? "right-10" : "left-10",
        )}
      >
        {props.ratingChange >= 0 ? "+" : ""}
        {props.ratingChange}
      </div>
      <div className="pt-3">
        <Image
          src={props.image}
          alt="Player Avatar"
          width="30"
          height="30"
          className="object-cover w-12 h-12 rounded-full"
        />
      </div>
    </div>
  );
};

export interface HistoryUserCardProps {
  avatarPath: string;
  username: string;
  ratingChange: number;
  side: string;
}
const HistoryUserCard = (props: HistoryUserCardProps) => {
  return (
    <div className="flex flex-col gap-2 bg-inherit items-center">
      <Link href={`/profile/${props.username}`}>
        <UserImage
          image={props.avatarPath}
          ratingChange={props.ratingChange}
          side={props.side}
        />
      </Link>
      <div className="flex flex-col gap-[2px] items-center w-full">
        <p className="text-light-fg-tertiary text-sm border-2 border-light-fg-primary dark:border-dark-fg-primary rounded-lg bg-light-fg-link px-1 flex flex-col items-center min-w-[50px] max-w-[160px]">
          {props.username}
        </p>
        <div className="w-8 h-[6px] bg-light-fg-primary dark:bg-dark-fg-primary"></div>
      </div>
    </div>
  );
};

export default HistoryUserCard;
