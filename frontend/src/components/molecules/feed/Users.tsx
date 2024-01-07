import React from "react";
import Link from "next/link";

import UserCard from "./UserCard";
import InputSearch from "@components/atoms/InputSearch";
import Loading from "@components/atoms/icons/outline/Loading";

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  avatarPath: string;
}

export interface UsersProps {
  users: User[];
  query: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClear: () => void;
  isLoading?: boolean;
}

const Users = ({
  users,
  query,
  onSearchChange,
  onSearchClear,
  isLoading,
}: UsersProps) => {
  const imageUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/assets/images/";

  return (
    <div className="flex flex-col align-start w-full gap-8 p-8 rounded-lg border border-light-fg-link bg-light-bg-tertiary dark:bg-dark-fg-tertiary dark:border-dark-fg-primary">
      <div className="flex flex-row justify-between w-full">
        <p className="text-light-fg-primary text-xl lg:text-lg md:text-md sm:text-base">
          Users
        </p>
      </div>
      <InputSearch
        placeholder="Search..."
        value={query}
        onChange={onSearchChange}
        onClear={onSearchClear}
        textColor="light-fg-link"
        width="w-full"
      />
      <div className="flex flex-col align-start w-full min-h-[300px] gap-8">
        {isLoading && (
          <div className="flex flex-row justify-center w-full">
            <Loading height="h-20" width="w-20" />
          </div>
        )}
        {users.map((user, index) => (
          <Link
            key={index}
            href={`/profile/${user.username}`}
            className="flex flex-row justify-between w-full gap-12 lg:gap-4 sm:flex-col sm:gap-2 sm:justify-center sm:items-center min-w-min"
          >
            <UserCard
              fullName={user.firstName + " " + user.lastName}
              image={imageUrl + user.avatarPath}
              username={user.username}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Users;
