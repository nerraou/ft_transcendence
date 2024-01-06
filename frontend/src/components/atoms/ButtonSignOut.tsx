import SignOut from "@icons/outline/SignOut";

interface ButtonSignOutProps {
  onClick: () => void;
}

export default function ButtonSignOut(props: ButtonSignOutProps) {
  return (
    <button
      onClick={props.onClick}
      className="inline-flex max-w-max items-center justify-center space-x-4 border-2 rounded-lg border-light-bg-primary px-4 py-2"
    >
      <span className="text-base text-light-bg-primary">Sign Out</span>
      <SignOut />
    </button>
  );
}
