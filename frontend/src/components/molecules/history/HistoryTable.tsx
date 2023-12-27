import React from "react";
import { Column, HeaderGroup, Row, useTable } from "react-table";

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

const TableHeader = ({
  headerGroups,
}: {
  headerGroups: HeaderGroup<Game>[];
}) => {
  return (
    <thead className="h-16">
      {headerGroups.map((headerGroup, id1) => (
        <tr
          {...headerGroup.getHeaderGroupProps()}
          key={`${id1}-headerGroup`}
          className="bg-light-fg-primary dark:bg-dark-bg-primary texte-base"
        >
          {headerGroup.headers.map((column, id2) => (
            <th {...column.getHeaderProps()} key={`${id2}-column`}>
              {column.render("Header")}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

const TableRows = ({
  rows,
  prepareRow,
  getTableBodyProps,
}: {
  rows: Row<Game>[];
  prepareRow: (row: Row<Game>) => void;
  getTableBodyProps: () => any;
}) => {
  return (
    <tbody {...getTableBodyProps()} className="">
      {rows.map((row, id1) => {
        prepareRow(row);
        return (
          // padding 16px 30px
          <tr
            {...row.getRowProps()}
            key={`${id1}-row`}
            className="border-t border-light-fg-primary dark:border-dark-fg-primary"
          >
            {row.cells.map((cell, id2) => (
              <td
                {...cell.getCellProps()}
                key={`${id2}-cell`}
                className="px-5 py-2 lg:px-2 md:px-0 sm:px-0 xs:px-10"
              >
                {cell.render("Cell")}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};

interface HistoryTableProps {
  games: Game[];
  columns: Column<Game>[];
}

const HistoryTable = ({ games, columns }: HistoryTableProps) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: games });

  return (
    <div className="w-full border-4 text-light-bg-tertiary text-base bg-light-bg-tertiary border-light-fg-primary dark:border-dark-fg-primary rounded-lg rounded-b-xxl pb-3">
      <table {...getTableProps()} className="w-full rounded-lg text-sm">
        <TableHeader headerGroups={headerGroups} />
        <TableRows
          rows={rows}
          prepareRow={prepareRow}
          getTableBodyProps={getTableBodyProps}
        />
      </table>
    </div>
  );
};

export default HistoryTable;
