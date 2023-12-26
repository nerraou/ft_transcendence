import InputSearch from "@components/atoms/InputSearch";
import FriendsList from "./FriendsList";

function SearchFriendsList() {
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
      <FriendsList />
    </section>
  );
}

export default SearchFriendsList;
