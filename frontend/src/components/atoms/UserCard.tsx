import Image from "next/image";

interface UsernameProps {
  fullName: string;
  username: string;
}

interface UserImageProps {
  image: string;
}

interface UserProps {
  fullName: string;
  username: string;
  image: string;
}

function Username(props: UsernameProps) {
  return (
    <div className="flex flex-col">
      <label className="text-light-fg-primary text-xl sm:text-lg md:text-lg lg:text-lg">
        {props.fullName}
      </label>
      <label className="text-light-fg-secondary text-lg leading-none sm:text-md md:text-md">
        {props.username}
      </label>
    </div>
  );
}

function UserImage(props: UserImageProps) {
  return (
    <Image
      src={props.image}
      alt="user image"
      width="128"
      height="128"
      className="rounded-lg custom-position object-cover w-32 h-32 sm:w-15 sm:h-15"
    />
  );
}

function User(props: UserProps) {
  return (
    <div className="flex sm:flex-col sm:items-center gap-4 sm:gap-1 bg-light-bg-tertiary">
      <UserImage image={props.image} />
      <Username username={props.username} fullName={props.fullName} />
    </div>
  );
}

export default User;
