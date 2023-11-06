"use client";
import InputSearch from "@components/atoms/InputSearch";
import FriendCard from "@components/molecules/FriendCard";
import Layout from "@components/templates/Layout";
import { UserStatus } from "@components/molecules/FriendCard";

interface User {
  fullname: string;
  image: string;
  username: string;
  userStatus: UserStatus;
  level: number;
}

const content: User[] = [
  {
    fullname: "Nouhayla Erraou",
    image: "/totoro.jpg",
    username: "noface",
    userStatus: "offline",
    level: 11,
  },
  {
    fullname: "Nouhayla amin Erraou",
    image: "/avatar.png",
    username: "noface",
    userStatus: "offline",
    level: 11,
  },
  {
    fullname: "Nouhayla Erraou",
    image: "/avatar.png",
    username: "noface",
    userStatus: "offline",
    level: 11,
  },
  {
    fullname: "Nouhayla amin Erraou",
    image: "/anime.jpg",
    username: "noface",
    userStatus: "offline",
    level: 11,
  },
  {
    fullname: "Nouhayla amin Erraou",
    image: "/avatar.png",
    username: "noface",
    userStatus: "offline",
    level: 11,
  },
  {
    fullname: "Nouhayla Erraou",
    image: "/avatar.png",
    username: "noface",
    userStatus: "offline",
    level: 11,
  },
];

function FriendsPage() {
  return (
    <Layout>
      <div className="flex justify-end p-8 ">
        <InputSearch
          value="Search"
          placeholder="Search"
          width="w-96 sm:w-60"
          onChange={() => {
            return;
          }}
          onClear={() => {
            return;
          }}
          textColor=""
        />
      </div>
      <div className="grid grid-rows-3 grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-8 px-16 pb-16 sm:px-8">
        {content.map((value, key) => {
          return (
            <FriendCard
              key={key}
              fullname={value.fullname}
              image={value.image}
              username={value.username}
              userStatus={value.userStatus}
              level={value.level}
            />
          );
        })}
      </div>
    </Layout>
  );
}
export default FriendsPage;
