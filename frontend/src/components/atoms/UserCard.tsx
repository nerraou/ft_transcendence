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
      <label className="text-light-fg-primary text-xl sm:text-lg md:text-lg lg:text-lg sm:text-center">
        {props.fullName}
      </label>
      <label className="text-light-fg-secondary text-lg leading-none sm:text-lg md:text-lg sm:text-center">
        {props.username}
      </label>
    </div>
  );
}

function UserImage(props: UserImageProps) {
  return (
    <div className="relative shrink-0 w-32 h-32 md:w-24 md:h-24 sm:w-20 sm:h-20 lg:w-16 lg:h-16">
      <Image
        src={props.image}
        alt="user image"
        fill
        sizes="w-32 h-32 md:w-24 md:h-24 sm:w-20 sm:h-20 lg:w-16 lg:h-16"
        className="rounded-lg object-cover appearance-none"
      />
    </div>
  );
}

function User(props: UserProps) {
  return (
    <div className="flex sm:flex-col sm:items-center gap-4 sm:gap-1 sm:w-full bg-light-bg-tertiary">
      <UserImage image={props.image} />
      <Username username={props.username} fullName={props.fullName} />
    </div>
  );
}

export default User;
