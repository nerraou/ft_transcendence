import InputSearch from "@components/atoms/InputSearch";
import ChannelsList from "./ChannelsList";
import { ChannelProps } from "@components/atoms/chat/Channel";
import baseQuery from "@utils/baseQuery";
import {
  QueryErrorResetBoundary,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Modal from "@components/atoms/Modal";
import Button from "@components/atoms/Button";
import { Suspense } from "react";
import LoadingPage from "@app/loading";

interface SearchChannelsListProps {
  token: string | unknown;
}

interface ChannelsListProps {
  channels: ChannelProps[];
}

async function getChannels(token: string | unknown) {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/channels";

  const res = await baseQuery(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const response = await res.json();
  return response;
}

function SearchChannelsList(props: SearchChannelsListProps) {
  const { data } = useSuspenseQuery<ChannelsListProps>({
    queryKey: ["channels"],
    queryFn: () => {
      return getChannels(props.token);
    },
  });

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
              <ChannelsList channels={data.channels} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </section>
  );
}

export default SearchChannelsList;
