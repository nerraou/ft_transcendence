/* eslint-disable react/jsx-key */
import React from "react";
import { Column, useTable } from "react-table";
import clsx from "clsx";

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
  columns: Column<Game>[];
}

const HistoryTable = ({ games, columns }: HistoryTableProps) => {
  // react-table

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: games });

  return (
    <div>
      <table
        {...getTableProps()}
        className="rounded-lg bg-light-bg-tertiary dark:bg-dark-fg-primary border-light-fg-primary dark:border-dark-fg-primary"
      >
        <thead className="rounded-t-lg">
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="bg-light-fg-primary dark:bg-dark-bg-primary"
            >
              {headerGroup.headers.map((column, index) => (
                <th
                  {...column.getHeaderProps()}
                  className={clsx(
                    index === 0 ? "rounded-tl-lg" : "",
                    index === headerGroup.headers.length - 1
                      ? "rounded-tr-lg"
                      : "",
                    "text-light-fg-tertiary",
                    "px-4 py-2",
                  )}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="bg-light-bg-tertiary rounded-lg border-light-fg-primary dark:border-dark-fg-primary"
        >
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="px-4 py-2 rounded-lg"
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
