"use client";
import Button from "@components/atoms/Button";
import Modal from "@components/atoms/Modal";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { Suspense, useCallback } from "react";
import { ErrorBoundary } from "react-error-boundary";
import LoadingPage from "../../loading";
import Layout from "@components/templates/Layout";
import HistoryTable from "@components/molecules/history/HistoryTable";
import useGameHistory, {
  ROWS_PER_PAGE,
} from "@components/molecules/history/useGameHistory";
import { getColumns } from "@components/molecules/history/HistoryTableColumns";
import Pagination from "@components/atoms/Pagination";
import DatePickerInterval from "@components/atoms/DatePickerInterval";
import InputSearch from "@components/atoms/InputSearch";
import { useMediaQuery } from "@hooks/useMediaQuery";
import debounce from "lodash/debounce";

interface HistoryProps {
  token: string | unknown;
  username: string;
}

interface HistoryPageProps {
  params: {
    username: string;
  };
}

const History = ({ token, username }: HistoryProps) => {
  const { data, filters, setFilters } = useGameHistory(token, username);
  const xs = useMediaQuery("(max-width: 550px)");
  const xxs = useMediaQuery("(max-width: 450px)");
  const columns = getColumns(filters, setFilters, xs, xxs);
  const [query, setQuery] = React.useState<string>("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetQuery = useCallback(
    debounce((q) => setFilters({ ...filters, query: q }), 1000),
    [filters.query],
  );

  return (
    <div className="flex flex-col h-full gap-16 bg-inherit w-full items-center justify-center self-stretch p-8 md:p-4 sm:p-2">
      <div className="flex flex-col h-full gap-16 bg-inherit w-full items-center justify-start">
        <div className="flex flex-row gap-6 w-full items-start justify-start sm:flex-col sm:items-center sm:justify-center">
          <DatePickerInterval
            value={filters.dateInterval}
            onChange={(dateInterval) =>
              setFilters({ ...filters, dateInterval })
            }
          />
          <InputSearch
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              debouncedSetQuery(e.target.value);
            }}
            onClear={() => {
              setQuery("");
              setFilters({ ...filters, query: "" });
            }}
            placeholder="Search"
            textColor="text-light-fg-primary"
          />
        </div>
        {data.count > 0 ? (
          <>
            <div className="flex flex-col gap-4 bg-inherit h-full w-full items-center">
              <HistoryTable games={data.games} columns={columns} />
            </div>
            <div className="w-full flex flex-row justify-center items-center">
              <Pagination
                onChange={(page) => setFilters({ ...filters, page })}
                page={filters.page}
                total={Math.ceil(data.count / ROWS_PER_PAGE)}
              />
            </div>
          </>
        ) : (
          <p className="text-xl text-light-fg-primary dark:text-dark-fg-primary text-center">
            No games found
          </p>
        )}
      </div>
    </div>
  );
};

export default function HistoryPage({ params }: HistoryPageProps) {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  if (sessionStatus === "unauthenticated") {
    redirect("/sign-in");
  }

  if (sessionStatus === "loading") {
    return (
      <LoadingPage
        bgColor="bg-light-bg-tertiary dark:bg-dark-bg-primary"
        width="w-screen"
        height="h-screen"
      />
    );
  }

  return (
    <Layout>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => (
              <Modal
                isOpen
                title="Error"
                description={
                  error.response?.status === 403
                    ? `Username "${params.username}" does not exist`
                    : "Something went wrong"
                }
                action={
                  <Button
                    text={
                      error.response?.status === 403 ? "Back to home" : "Retry"
                    }
                    onClick={() => {
                      if (error.response?.status === 403) {
                        router.push("/feed");
                      } else {
                        resetErrorBoundary();
                      }
                    }}
                  />
                }
              />
            )}
            onReset={reset}
          >
            <Suspense fallback={<LoadingPage />}>
              <History
                token={session?.user.accessToken}
                username={params.username}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Layout>
  );
}
