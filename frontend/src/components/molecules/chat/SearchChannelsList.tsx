import InputSearch from "@atoms/InputSearch";
import ChannelsList from "./ChannelsList";
import { ChannelProps } from "@molecules/chat/ChannelsList";
import baseQuery from "@utils/baseQuery";
import {
  QueryErrorResetBoundary,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Modal from "@components/atoms/Modal";
import Button from "@components/atoms/Button";
import { ChangeEvent, Suspense, useState } from "react";
import LoadingPage from "@app/loading";
import { ChannelInformation } from "@app/chat/[[...username]]/page";

interface SearchChannelsListProps {
  token: string | unknown;
  channelInformation: ChannelInformation;
  onChannelClick: (channelInformation: ChannelInformation) => void;
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
  const [searchChannel, setSearchChannel] = useState("");

  const { data } = useSuspenseQuery<ChannelsListProps>({
    queryKey: ["channels"],
    queryFn: () => {
      return getChannels(props.token);
    },
  });

  const [filtredChannels, setFiltredChannels] = useState<ChannelProps[]>(
    data.channels,
  );

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const searchTerm = e.target.value;
    setSearchChannel(searchTerm);

    const filtredItems = data.channels.filter((channel) => {
      return channel.name.toLowerCase().startsWith(searchTerm.toLowerCase());
    });
    setFiltredChannels(filtredItems);
  }

  return (
    <section className="flex flex-col space-y-4">
      <InputSearch
        value={searchChannel}
        bgColor="bg-light-fg-tertiary"
        textColor="text-light-fg-primary"
        placeholder="Search"
        width="w-full"
        onChange={handleInputChange}
        onClear={() => {
          setSearchChannel("");
          setFiltredChannels(data.channels);
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
              <ChannelsList
                channelInformation={props.channelInformation}
                onChannelClick={props.onChannelClick}
                channels={filtredChannels}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </section>
  );
}

export default SearchChannelsList;
