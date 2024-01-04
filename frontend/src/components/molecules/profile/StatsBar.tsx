interface StatsBarProps {
  winsPercentage: number;
  lossesPercentage: number;
  losses: number;
  wins: number;
}

interface PercentageProps {
  losses: number;
  wins: number;
}
interface ResultProps {
  losses: number;
  wins: number;
}
function Result(props: ResultProps) {
  return (
    <div className="flex justify-between">
      <label className="text-light-fg-tertiary text-xl">{props.wins} won</label>
      <label className="text-light-fg-secondary text-xl">
        {props.losses} lost
      </label>
    </div>
  );
}

function Percentage(props: PercentageProps) {
  return (
    <div className="flex justify-between">
      <label className="text-light-fg-tertiary text-xl">
        {props.wins + "%"}
      </label>
      <label className="text-light-fg-secondary text-xl">
        {props.losses + "%"}
      </label>
    </div>
  );
}

function Bar(props: PercentageProps) {
  return (
    <div className="flex border-2 box-border rounded-lg border-light-fg-primary w-full h-8 overflow-hidden bg-light-fg-tertiary">
      <div
        className="bg-light-bg-tertiary rounded-l-lg"
        style={{
          width: `${props.wins}%`,
        }}
      ></div>
      <div
        className="bg-light-fg-secondary rounded-r-lg"
        style={{
          width: `${props.losses}%`,
        }}
      ></div>
    </div>
  );
}

function StatsBar(props: StatsBarProps) {
  return (
    <div className="w-full">
      <Percentage
        losses={Math.trunc(props.lossesPercentage)}
        wins={Math.trunc(props.winsPercentage)}
      />
      <Bar losses={props.lossesPercentage} wins={props.winsPercentage} />
      <Result losses={props.losses} wins={props.wins} />
    </div>
  );
}

export default StatsBar;
