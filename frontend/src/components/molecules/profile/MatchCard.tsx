import Player from "@atoms/Player";
import { PlayerProps } from "@atoms/Player";

interface MatchCardProps {
  player1: PlayerProps;
  player2: PlayerProps;
}

function MatchCard(props: MatchCardProps) {
  return (
    <div className="flex justify-around items-center box-border rounded-full border-light-fg-primary bg-light-bg-secondary border-8 h-44 w-96">
      <Player {...props.player1} />
      <Player {...props.player2} />
    </div>
  );
}

export default MatchCard;
