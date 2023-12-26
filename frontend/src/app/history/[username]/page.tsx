"use client";
import Button from "@components/atoms/Button";
import Modal from "@components/atoms/Modal";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import LoadingPage from "../../loading";
import Layout from "@components/templates/Layout";
import HistoryTable from "@components/molecules/history/HistoryTable";
import useHistory from "@components/molecules/history/UseFilters";
import { getColumns } from "@components/molecules/history/HistoryTableColumns";

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
  const { data, filters, setFilters } = useHistory(token);

  const columns = getColumns(filters, setFilters);

  return (
    <div className="flex flex-col gap-4 bg-inherit w-full items-center">
      History page of {username}
      <div className="flex flex-col gap-4 bg-inherit w-full items-center">
        <HistoryTable games={data.games} columns={columns} />
      </div>
    </div>
  );
};

export default function HistoryPage({ params }: HistoryPageProps) {
  const { data: session, status: sessionStatus } = useSession();

  if (sessionStatus === "unauthenticated") {
    redirect("/sign-in");
  }

  if (sessionStatus === "loading") {
    return (
      <LoadingPage
        bgColor=" bg-light-bg-tertiary dark:bg-dark-bg-primary"
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
            fallbackRender={({ resetErrorBoundary }) => (
              <Modal
                isOpen
                title="Error"
                description="Something went wrong"
                action={
                  <Button
                    text="Retry"
                    onClick={() => {
                      resetErrorBoundary();
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
