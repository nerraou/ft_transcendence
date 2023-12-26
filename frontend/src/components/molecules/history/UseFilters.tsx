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
};

const useHistory = (token: string | unknown) => {
  const [filters, setFilters] = useState<HistoryFilters>({
    query: "",
    dateSort: undefined,
    timeSort: undefined,
    dateInterval: undefined,
  });

  const fetchData = async () => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/history";

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
