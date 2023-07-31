import clsx from "clsx";

interface StatsBarProps {
  matches: number;
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
      <label className="text-light-fg-tertiary text-2xl">
        {clsx(props.wins, "wins")}
      </label>
      <label className="text-light-fg-secondary text-2xl">
        {clsx(props.losses, "losts")}
      </label>
    </div>
  );
}

function Percentage(props: PercentageProps) {
  return (
    <div className="flex justify-between">
      <label className="text-light-fg-tertiary text-2xl">
        {props.wins + "%"}
      </label>
      <label className="text-light-fg-secondary text-2xl">
        {props.losses + "%"}
      </label>
    </div>
  );
}

function Bar(props: PercentageProps) {
  return (
    <div className="flex border-2 box-border rounded-2xl border-light-fg-primary w-full h-8">
      <div
        className={clsx("bg-light-bg-tertiary rounded-l-2xl")}
        style={{
          width: `${props.wins}%`,
        }}
      ></div>
      <div
        className={clsx("bg-light-fg-secondary rounded-r-2xl")}
        style={{
          width: `${props.losses}%`,
        }}
      ></div>
    </div>
  );
}

function StatsBar(props: StatsBarProps) {
  const losses = (100 * props.losses) / props.matches;
  const wins = (100 * props.wins) / props.matches;

  return (
    <div className="w-full">
      <Percentage losses={losses} wins={wins} />
      <Bar losses={losses} wins={wins} />
      <Result losses={props.losses} wins={props.wins} />
    </div>
  );
}

export default StatsBar;
