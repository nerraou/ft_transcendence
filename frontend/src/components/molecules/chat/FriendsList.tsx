import User from "@components/atoms/chat/User";
import { UserProps } from "@components/atoms/chat/User";

interface FriendsListProps {
  friends: UserProps[];
}

function FriendsList(props: FriendsListProps) {
  const imageUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/assets/images/";
  return (
    <div className="bg-light-fg-tertiary border-2 border-light-fg-primary rounded-lg p-4 space-y-4">
      <h3 className="px-4 py-2 text-base text-light-bg-secondary bg-dark-bg-secondary border-2 border-light-fg-primary">
        FRIENDS
      </h3>
      <div className="space-y-3 px-5">
        {props.friends.map((friend) => {
          console.log(friend.avatarPath);
          return (
            <User
              key={friend.id}
              avatarPath={imageUrl + friend.avatarPath}
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
