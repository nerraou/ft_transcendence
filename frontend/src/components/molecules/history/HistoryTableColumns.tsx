import Clock from "@components/atoms/icons/outline/Clock";
import HistoryUserCard from "./HistoryUserCard";
import RankUp from "@components/atoms/icons/outline/RankUp";
import RankDown from "@components/atoms/icons/outline/RankDown";
import RankStable from "@components/atoms/icons/outline/RankStable";
import Plus from "@components/atoms/icons/outline/Plus";
import Minus from "@components/atoms/icons/outline/Minus";
import ChevronDown from "@components/atoms/icons/outline/ChevronDown";
import ChevronUp from "@components/atoms/icons/outline/ChevronUp";
import Selector from "@components/atoms/icons/outline/Selector";
import { HistoryFilters } from "./useGameHistory";
import { clsx } from "clsx";
import { ColumnDef } from "@tanstack/react-table";
import { Game } from "./HistoryTable";

export enum SortEnum {
  DESC = "desc",
  ASC = "asc",
}

const getSortIcon = (sort: SortEnum | undefined) => {
  if (sort == SortEnum.ASC) {
    return <ChevronUp />;
  }
  if (sort == SortEnum.DESC) {
    return <ChevronDown />;
  }
  return <Selector />;
};

interface SortButtonProps {
  title: string;
  filters: HistoryFilters;
  setFilters: (newFilters: HistoryFilters) => void;
  toSet: "timeSort" | "dateSort";
  toUnset: "timeSort" | "dateSort";
}
const SortButton = ({
  title,
  filters,
  setFilters,
  toSet,
  toUnset,
}: SortButtonProps) => {
  return (
    <div className="flex flex-row items-center gap-2 w-full justify-center">
      <p className="align-middle">{title}</p>
      <button
        className="flex flex-col items-center justify-center"
        onClick={() => {
          if (!filters[toSet]) {
            setFilters({
              ...filters,
              [toSet]: SortEnum.DESC,
              [toUnset]: undefined,
            });
          } else if (filters[toSet] === SortEnum.DESC) {
            setFilters({
              ...filters,
              [toSet]: SortEnum.ASC,
              [toUnset]: undefined,
            });
          } else {
            setFilters({ ...filters, [toSet]: undefined });
          }
        }}
      >
        {title === "Time"
          ? getSortIcon(filters.timeSort)
          : getSortIcon(filters.dateSort)}
      </button>
    </div>
  );
};

interface Result {
  value: {
    score: string;
    isWinner: boolean;
  };
}

const getRankingIcon = (oldRanking: number, newRanking: number) => {
  if (oldRanking > newRanking) {
    return <RankUp className="text-light-bg-secondary" />;
  }
  if (oldRanking < newRanking) {
    return <RankDown className="text-light-fg-secondary" />;
  }
  return (
    <RankStable className="text-xl text-light-fg-primary dark:text-dark-fg-primary" />
  );
};

function msToTime(duration: number) {
  const minutes = Math.floor(duration / 60000);
  const seconds = ((duration % 60000) / 1000).toFixed(0);
  return minutes + ":" + (parseInt(seconds) < 10 ? "0" : "") + seconds;
}

export function getColumns(
  filters: HistoryFilters,
  setFilters: (newFilters: HistoryFilters) => void,
  xs: boolean,
  xxs: boolean,
): ColumnDef<Game>[] {
  return [
    {
      header: () => (
        <div className="sm:hidden">
          <SortButton
            title="Time"
            filters={filters}
            setFilters={setFilters}
            toSet="timeSort"
            toUnset="dateSort"
          />
        </div>
      ),
      accessorKey: "duration",
      cell: ({ getValue }) => {
        return (
          <div className="flex justify-center items-center gap-2 lg:gap-1 md:gap-1 sm:gap-1 xs:gap-1 sm:hidden">
            <div className="text-light-fg-primary dark:text-dark-fg-primary">
              {msToTime(getValue() as number)}
            </div>
            <Clock color="stroke-light-fg-primary dark:stroke-dark-fg-primary w-5 h-5 " />
          </div>
        );
      },
    },
    {
      header: "Player 1",
      accessorKey: "player",
      cell: ({ getValue }) => {
        const player = getValue() as Game["player"];
        return (
          <HistoryUserCard
            avatarPath={
              process.env.NEXT_PUBLIC_API_BASE_URL +
              "/assets/images/" +
              player.avatarPath
            }
            username={player.username}
            ratingChange={player.newRating - player.oldRating}
            side="player"
          />
        );
      },
    },
    {
      header: "Result",
      accessorFn: (row) => ({
        score: row.player.score + "-" + row.opponent.score,
        isWinner: row.player.isWinner,
      }),
      cell: ({ getValue }) => {
        const { score, isWinner } = getValue() as Result["value"];
        return (
          <div className="flex flex-col gap-2 items-center">
            <div className="text-light-fg-primary dark:text-dark-fg-primary">
              {score}
            </div>
            {isWinner ? (
              <Plus className="text-light-bg-primary" />
            ) : (
              <Minus className="text-light-fg-secondary" />
            )}
          </div>
        );
      },
    },
    {
      header: "Player 2",
      accessorKey: "opponent",
      cell: ({ getValue }) => {
        const opponent = getValue() as Game["opponent"];
        return (
          <HistoryUserCard
            avatarPath={
              process.env.NEXT_PUBLIC_API_BASE_URL +
              "/assets/images/" +
              opponent.avatarPath
            }
            username={opponent.username}
            ratingChange={opponent.newRating - opponent.oldRating}
            side="opponent"
          />
        );
      },
    },
    {
      header: () => <p className={clsx(xxs ? "hidden" : "")}>Ranking</p>,
      accessorKey: "player",
      cell: ({ getValue }) => {
        const { oldRanking, newRanking } = getValue() as Game["player"];
        return (
          <div
            className={clsx(
              xxs ? "hidden" : "",
              "flex gap-2 items-center justify-center",
            )}
          >
            {getRankingIcon(oldRanking, newRanking)}
            <p className="text-xl text-light-fg-primary dark:text-dark-fg-primary">
              {newRanking}
            </p>
          </div>
        );
      },
    },
    {
      header: () => (
        <div className={clsx(xs ? "hidden" : "")}>
          <SortButton
            title="Date"
            filters={filters}
            setFilters={setFilters}
            toSet="dateSort"
            toUnset="timeSort"
          />
        </div>
      ),
      accessorKey: "createdAt",
      cell: ({ getValue }) => {
        const date = new Date(getValue() as number);
        return (
          <div
            className={clsx(
              xs ? "hidden" : "",
              "text-light-fg-primary dark:text-dark-fg-primary flex justify-center items-center",
            )}
          >
            {date.toLocaleDateString()}
          </div>
        );
      },
    },
  ];
}
