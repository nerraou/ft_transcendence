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
import { Column } from "react-table";
import { Game } from "./HistoryTable";

// eslint-disable-next-line no-shadow
export enum SortEnum {
  DESC = "DESC",
  ASC = "ASC",
}

interface SortButtonProps {
  title: string;
  sort: SortEnum | undefined;
  setSort: (sort: SortEnum | undefined) => void;
}
const SortButton = ({ title, sort, setSort }: SortButtonProps) => {
  return (
    <div className="flex flex-row items-center gap-2 w-full justify-center">
      <label className="align-middle" htmlFor="sort">
        {title}
      </label>
      <button
        className="flex flex-col items-center justify-center"
        onClick={() => {
          if (!sort) {
            setSort(SortEnum.DESC);
          } else if (sort === SortEnum.DESC) {
            setSort(SortEnum.ASC);
          } else {
            setSort(undefined);
          }
        }}
      >
        {sort == SortEnum.ASC ? <ChevronUp /> : null}
        {sort == SortEnum.DESC ? <ChevronDown /> : null}
        {sort == undefined ? <Selector /> : null}
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

type HistoryFilters = {
  dateSort: SortEnum | undefined;
  timeSort: SortEnum | undefined;
};

export function getColumns(
  filters: HistoryFilters,
  setFilters: (newFilters: HistoryFilters) => void,
): Column<Game>[] {
  return [
    {
      Header: () => (
        <SortButton
          title="Time"
          sort={filters.timeSort}
          setSort={(sort) => setFilters({ ...filters, timeSort: sort })}
        />
      ),
      accessor: "createdAt",
      Cell: ({ value }) => {
        const date = new Date(value);
        return (
          <div
            className="flex justify-center items-center text-base gap-2"
            title={date.toLocaleDateString() + " " + date.toLocaleTimeString()}
          >
            <div className="text-light-fg-primary dark:text-dark-fg-primary">
              {date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <Clock color="stroke-light-fg-primary dark:stroke-dark-fg-primary" />
          </div>
        );
      },
    },
    {
      Header: "Player 1",
      accessor: "player",
      Cell: ({ value }) => (
        <HistoryUserCard
          avatarPath={
            process.env.NEXT_PUBLIC_API_BASE_URL +
            "/assets/images/" +
            value.avatarPath
          }
          username={value.username}
          ratingChange={value.newRating - value.oldRating}
          side="player"
        />
      ),
    },
    {
      Header: "Result",
      // player score- opponent score
      accessor: (row) => ({
        score: row.player.score + "-" + row.opponent.score,
        isWinner: row.player.isWinner,
      }),
      Cell: ({ value: { score, isWinner } }: Result) => (
        <div className="flex flex-col gap-2 items-center">
          <div className="text-light-fg-primary dark:text-dark-fg-primary">
            {score}
          </div>
          {isWinner ? <Plus /> : <Minus />}
        </div>
      ),
    },
    {
      Header: "Player 2",
      accessor: "opponent",
      Cell: ({ value }) => (
        <HistoryUserCard
          avatarPath={
            process.env.NEXT_PUBLIC_API_BASE_URL +
            "/assets/images/" +
            value.avatarPath
          }
          username={value.username}
          ratingChange={value.newRating - value.oldRating}
          side="opponent"
        />
      ),
    },
    {
      Header: "Rank",
      id: "ranking",
      accessor: "player",
      Cell: ({ value }) => {
        const { oldRanking, newRanking } = value;
        return (
          <div className="flex gap-2 items-center">
            {getRankingIcon(oldRanking, newRanking)}
            <label className="text-xl text-light-fg-primary dark:text-dark-fg-primary">
              {newRanking}
            </label>
          </div>
        );
      },
    },
    {
      Header: () => (
        <SortButton
          title="Duration"
          sort={filters.dateSort}
          setSort={(sort) => setFilters({ ...filters, dateSort: sort })}
        />
      ),
      id: "createdAtTime",
      accessor: "createdAt",
      Cell: ({ value }) => {
        const date = new Date(value);
        return (
          <div className="text-light-fg-primary dark:text-dark-fg-primary">
            {date.toLocaleDateString()}
          </div>
        );
      },
    },
  ];
}
