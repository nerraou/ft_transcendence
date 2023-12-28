import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import React from "react";

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
  columns: ColumnDef<Game>[];
}

const HistoryTable = ({ games, columns }: HistoryTableProps) => {
  const table = useReactTable({
    data: games,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full border-4 text-light-bg-tertiary text-base bg-light-bg-tertiary border-light-fg-primary dark:border-dark-fg-primary rounded-lg rounded-b-xxl pb-3">
      <table className="w-full rounded-lg text-base">
        <thead className="h-16">
          {table.getHeaderGroups().map((headerGroup, id1) => (
            <tr
              key={`${id1}-headerGroup`}
              className="bg-light-fg-primary dark:bg-dark-bg-primary texte-base"
            >
              {headerGroup.headers.map((header, id2) => (
                <th colSpan={header.colSpan} key={`column.id${id2}-column`}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, id1) => (
            <tr
              key={`${id1}-row`}
              className="border-t border-light-fg-primary dark:border-dark-fg-primary"
            >
              {row.getVisibleCells().map((cell, id2) => (
                <td key={`${id2}-cell`} className="py-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
