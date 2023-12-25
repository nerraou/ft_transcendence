import InputSearch from "@components/atoms/InputSearch";
import FriendsList from "./FriendsList";

function SearchFriendsList() {
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
      <FriendsList />
    </section>
  );
}

export default SearchFriendsList;
