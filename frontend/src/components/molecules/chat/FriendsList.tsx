import User from "@components/atoms/chat/User";
import { UserProps } from "@components/atoms/chat/User";
import Link from "next/link";

interface FriendsListProps {
  friends: UserProps[];
  onFriendClick: () => void;
}

function FriendsList(props: FriendsListProps) {
  const imageUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/assets/images/";
  return (
    <div className="bg-light-fg-tertiary border-2 border-light-fg-primary rounded-lg p-4 space-y-4">
      <h3 className="px-4 py-2 text-base text-light-bg-secondary bg-dark-bg-secondary border-2 border-light-fg-primary">
        FRIENDS
      </h3>
      <div className="space-y-3 px-2 scrollbar-thin h-56 overflow-auto scrollbar-thumb-light-fg-primary">
        {props.friends.map((friend) => {
          return (
            <div
              key={friend.id}
              className="hover:bg-light-bg-tertiary cursor-pointer"
              onClick={() => {
                props.onFriendClick;
              }}
            >
              <Link href={`/chat/${friend.username}`}>
                <User
                  avatarPath={imageUrl + friend.avatarPath}
                  status={friend.status}
                  username={friend.username}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FriendsList;
