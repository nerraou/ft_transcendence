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
import { Suspense } from "react";
import LoadingPage from "@app/loading";

interface FriendsListProps {
  token: string | unknown;
}

interface UsersProps {
  contacts: UserProps[];
}

async function getFriends(token: string | unknown) {
  const limit = 1000;
  const page = 1;
  const url =
    process.env.NEXT_PUBLIC_API_BASE_URL +
    `/contacts?limit=${limit}&page=${page}`;

  const res = await baseQuery(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const response = await res.json();
  return response;
}

function SearchFriendsList(props: FriendsListProps) {
  const { data } = useSuspenseQuery<UsersProps>({
    queryKey: ["friends"],
    queryFn: () => {
      return getFriends(props.token);
    },
  });
  //   console.log(data.friends);
  return (
    <section className="flex flex-col space-y-4">
      <InputSearch
        value=""
        bgColor="bg-light-fg-tertiary"
        textColor="text-light-fg-primary"
        placeholder="Search"
        width="w-full"
        onChange={() => {
          return;
        }}
        onClear={() => {
          return;
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
              <FriendsList friends={data.contacts} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </section>
  );
}

export default SearchFriendsList;
