import InputSearch from "@components/atoms/InputSearch";
import ChannelsList from "./ChannelsList";

function SearchChannelsList() {
  return (
    <section className="space-y-4">
      <InputSearch
        value=""
        bgColor="bg-light-fg-tertiary"
        textColor="text-light-fg-primary"
        placeholder="Search"
        width="w-90"
        onChange={() => {
          return;
        }}
        onClear={() => {
          return;
        }}
      />
      <ChannelsList />
    </section>
  );
}

export default SearchChannelsList;
