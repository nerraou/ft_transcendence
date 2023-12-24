/* eslint-disable react/jsx-key */
import Clock from "@components/atoms/icons/outline/Clock";
import React from "react";
// import useTable and columns types
import { useTable, Column } from "react-table";
import HistoryUserCard from "./HistoryUserCard";
import RankUp from "@components/atoms/icons/outline/RankUp";
import RankDown from "@components/atoms/icons/outline/RankDown";
import RankStable from "@components/atoms/icons/outline/RankStable";
import Plus from "@components/atoms/icons/outline/Plus";
import Minus from "@components/atoms/icons/outline/Minus";

interface Player {
  id: number;
  username: string;
  avatarPath: string;
  score: number;
  oldRating: number;
  newRating: number;
  oldRanking: number;
  newRanking: number;
  isWinner: boolean;
}

export interface Game {
  id: number;
  createdAt: number;
  duration: number;
  player: Player;
  opponent: Player;
}

interface HistoryTableProps {
  games: Game[];
}

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

const columns: Column<Game>[] = [
  {
    Header: "Time ",
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
    Header: "Date",
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

const HistoryTable = ({ games }: HistoryTableProps) => {
  // react-table
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: games });

  return (
    <div className="flex flex-col gap-4 bg-inherit w-full items-center">
      <table {...getTableProps()} className="table-auto">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="px-4 py-2">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="border px-4 py-2 bg-light-fg-tertiary"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
