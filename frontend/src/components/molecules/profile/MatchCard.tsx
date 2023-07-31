import Player from "@components/atoms/match-card/Player";
import { PlayerProps } from "@components/atoms/match-card/Player";

interface MatchCardProps {
  player1: PlayerProps;
  player2: PlayerProps;
}

function MatchCard(props: MatchCardProps) {
  return (
    <div className="inline-flex justify-around items-center box-border rounded-full border-light-fg-primary bg-light-bg-secondary border-8 h-44 w-96">
      <Player {...props.player1} />
      <Player {...props.player2} />
    </div>
  );
}

export default MatchCard;
