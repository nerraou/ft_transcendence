import Image from "next/image";
import clsx from "clsx";

interface PlayerProps {
  name: string;
  state: "win" | "lose";
  image: string;
}

interface PlayerNameProps {
  name: string;
}

interface PlayerImageProps {
  state: "win" | "lose";
  image: string;
}

function PlayerImage(props: PlayerImageProps) {
  return (
    <Image
      src={props.image}
      alt="user image"
      width="112"
      height="112"
      className={clsx(
        "border-8 object-none rounded-full w-28 h-28 custom-position",
        {
          "border-light-fg-tertiary": props.state == "win",
          "border-light-fg-secondary": props.state == "lose",
        },
      )}
    />
  );
}

function PlayerName(props: PlayerNameProps) {
  return (
    <div className="flex justify-center items-center flex-col self-auto">
      <div className="h-6 w-20 flex justify-center items-center bg-light-fg-link m-1 rounded-xl border-light-fg-primary border-2">
        <label className="text-light-fg-tertiary text-sm">{props.name}</label>
      </div>
      <div className="bg-light-fg-primary h-1.5 w-8"></div>
    </div>
  );
}

function Player(props: PlayerProps) {
  return (
    <div>
      <PlayerImage image={props.image} state={props.state} />
      <PlayerName name={props.name} />
    </div>
  );
}

export default Player;
export type { PlayerProps };
