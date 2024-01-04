import InputSearch from "@components/atoms/InputSearch";
import FriendsList from "./FriendsList";
import baseQuery from "@utils/baseQuery";
import {
  QueryErrorResetBoundary,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { UserProps } from "@components/atoms/chat/User";
import { ErrorBoundary } from "react-error-boundary";
import Button from "@components/atoms/Button";
import Modal from "@components/atoms/Modal";
import { ChangeEvent, Suspense, useEffect, useState } from "react";
import LoadingPage from "@app/loading";

interface FriendsListProps {
  token: string | unknown;
  onFriendClick: () => void;
}

interface UsersProps {
  contacts: UserProps[];
}

async function getFriends(token: string | unknown) {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + `/contacts`;

  const res = await baseQuery(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const response = await res.json();
  return response;
}

function SearchFriendsList(props: FriendsListProps) {
  const [searchFriend, setSearchFriend] = useState("");
  const [filtredFriends, setFiltredFriends] = useState<UserProps[]>([]);

  const { data } = useSuspenseQuery<UsersProps>({
    queryKey: ["chatFriends"],
    queryFn: () => {
      return getFriends(props.token);
    },
  });

  useEffect(() => {
    if (data.contacts) {
      setFiltredFriends(data.contacts);
    }
  }, [data.contacts]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const searchTerm = e.target.value;
    setSearchFriend(searchTerm);

    const filtredItems = data.contacts.filter((contact) => {
      return contact.username
        .toLowerCase()
        .startsWith(searchTerm.toLowerCase());
    });
    setFiltredFriends(filtredItems);
  }

  return (
    <section className="flex flex-col space-y-4">
      <InputSearch
        value={searchFriend}
        bgColor="bg-light-fg-tertiary"
        textColor="text-light-fg-primary"
        placeholder="Search"
        width="w-full"
        onChange={handleInputChange}
        onClear={() => {
          setSearchFriend("");
          setFiltredFriends(data.contacts);
        }}
      />
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => (
              <Modal
                isOpen
                title="Error"
                description="Something went wrong"
                action={
                  <Button
                    text="Retry"
                    onClick={() => {
                      resetErrorBoundary();
                    }}
                  />
                }
              />
            )}
          >
            <Suspense fallback={<LoadingPage />}>
              <FriendsList
                onFriendClick={props.onFriendClick}
                friends={filtredFriends}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </section>
  );
}

export default SearchFriendsList;
