import User from "@components/atoms/chat/User";
import { UserProps } from "@components/atoms/chat/User";

const friends: UserProps[] = [
  {
    username: "Jesse",
    image: "/totoro.jpg",
    status: "ONLINE",
  },
  {
    username: "Tom",
    image: "/noface.jpg",
    status: "OFFLINE",
  },
  {
    username: "Anna",
    image: "/anime.jpg",
    status: "ONLINE",
  },
];

function FriendsList() {
  return (
    <div className="bg-light-fg-tertiary border-2 border-light-fg-primary rounded-lg p-4 space-y-4">
      <h3 className="px-4 py-2 text-base text-light-bg-secondary bg-dark-bg-secondary border-2 border-light-fg-primary">
        FRIENDS
      </h3>
      <div className="space-y-3 px-5">
        {friends.map((friend, index) => {
          return (
            <User
              key={index}
              image={friend.image}
              status={friend.status}
              username={friend.username}
            />
          );
        })}
      </div>
    </div>
  );
}

export default FriendsList;
