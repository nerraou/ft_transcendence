import { DateInterval } from "@components/atoms/DatePickerInterval";
import { useSuspenseQuery } from "@tanstack/react-query";
import baseQuery from "@utils/baseQuery";
import { useState } from "react";
import { Game } from "./HistoryTable";
import { SortEnum } from "./HistoryTableColumns";

export interface HistoryData {
  count: number;
  games: Game[];
}

export type HistoryFilters = {
  query: string;
  dateSort: SortEnum | undefined;
  timeSort: SortEnum | undefined;
  dateInterval: DateInterval | null | undefined;
  page: number;
};

export const ROWS_PER_PAGE = 4;

const useGameHistory = (token: string | unknown, username: string) => {
  const [filters, setFilters] = useState<HistoryFilters>({
    query: "",
    dateSort: undefined,
    timeSort: undefined,
    dateInterval: undefined,
    page: 1,
  });

  const fetchData = async () => {
    const params = new URLSearchParams();
    if (filters.query) {
      params.append("search_query", filters.query);
    }
    if (filters.dateSort) {
      params.append("date", filters.dateSort);
    }
    if (filters.timeSort) {
      params.append("duration", filters.timeSort);
    }
    if (filters.dateInterval?.[0]) {
      params.append("start_date", filters.dateInterval[0].toString());
    }
    if (filters.dateInterval?.[1]) {
      params.append("end_date", filters.dateInterval[1].toString());
    }
    params.append("page", filters.page.toString());
    params.append("limit", ROWS_PER_PAGE.toString());
    const url =
      process.env.NEXT_PUBLIC_API_BASE_URL +
      `/users/${username}/games?` +
      params.toString();

    const res = await baseQuery(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    });
    const response = res.json();
    return response;
  };

  const { data, isLoading, isError } = useSuspenseQuery<HistoryData>({
    queryKey: ["history", filters],
    queryFn: fetchData,
  });

  return {
    data,
    filters,
    setFilters,
    isLoading,
    isError,
  };
};

export default useGameHistory;
