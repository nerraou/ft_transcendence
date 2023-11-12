import EmptyStatePlaceholder from "@components/atoms/EmptyStatePlaceholder";
import MatchCard from "@components/molecules/profile/MatchCard";

interface Player {
  id?: number;
  name: string;
  state: "win" | "lose";
  image: string;
}

interface ProfileOwner {
  name: string;
  image: string;
}

interface GameHistoryBriefProps {
  results: Array<Player>;
  profileOwner: ProfileOwner;
}

function GameHistoryCards(props: GameHistoryBriefProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {props.results.map((player, index) => {
        const profileOwnerState = player.state == "win" ? "lose" : "win";
        return (
          <MatchCard
            key={index}
            player1={{
              name: props.profileOwner.name,
              image: props.profileOwner.image,
              state: profileOwnerState,
            }}
            player2={{
              name: player.name,
              image: player.image,
              state: player.state,
            }}
          />
        );
      })}
    </div>
  );
}

function GameHistoryBrief(props: GameHistoryBriefProps) {
  let emptyHistory = false;
  if (props.results.length == 0) {
    emptyHistory = true;
  }
  return (
    <div>
      {!emptyHistory && <GameHistoryCards {...props} />}
      <div className="flex justify-center">
        {emptyHistory && <EmptyStatePlaceholder />}
      </div>
    </div>
  );
}

export default GameHistoryBrief;
