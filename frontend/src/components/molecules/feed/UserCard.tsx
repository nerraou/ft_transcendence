import Image from "next/image";
import Link from "next/link";
import React from "react";

interface UserImageProps {
  image: string;
}

const UserImage = (props: UserImageProps) => {
  return (
    <Image
      src={props.image}
      alt="channel image"
      width="30"
      height="30"
      className="custom-position object-cover w-12 h-12 rounded-full"
    />
  );
};

interface UserCardProps {
  fullName: string;
  username: string;
  image: string;
}

const UserCard = (props: UserCardProps) => {
  return (
    <Link
      href={`/profile/${props.username}`}
      className="flex gap-4 max-w-max bg-inherit lg:flex-col lg:align-center lg:gap-2 lg:justify-center sm:flex-col sm:align-center sm:gap-2 sm:justify-center"
    >
      <UserImage image={props.image} />
      <div className="flex flex-col gap-2">
        <label className="text-light-fg-link text-base cursor-pointer">
          {props.fullName}
        </label>
        <label className="text-light-fg-link text-sm leading-none cursor-pointer">
          {props.username}
        </label>
      </div>
    </Link>
  );
};

export default UserCard;
