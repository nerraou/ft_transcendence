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

const useHistory = (token: string | unknown, username: string) => {
  const [filters, setFilters] = useState<HistoryFilters>({
    query: "",
    dateSort: undefined,
    timeSort: undefined,
    dateInterval: undefined,
    page: 1,
  });

  const fetchData = async () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });
    const url =
      process.env.NEXT_PUBLIC_API_BASE_URL +
      `users/${username}/history?` +
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

export default useHistory;
