import Image from "next/image";
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
      className="custom-position object-cover w-[50px] h-[50px] rounded-full"
    />
  );
};

interface UserCardProps {
  fullName: string;
  username: string;
  image?: string;
}

const UserCard = (props: UserCardProps) => {
  const defaultImage = "/default/user-circle.png";

  return (
    <div className="flex gap-4 max-w-max bg-inherit">
      <UserImage image={props.image ?? defaultImage} />
      <div className="flex flex-col gap-2">
        <label className="text-light-fg-link text-base font-[400]">
          {props.fullName}
        </label>
        <label className="text-light-fg-link text-sm leading-none font-[400]">
          {props.username}
        </label>
      </div>
    </div>
  );
};

export default UserCard;
