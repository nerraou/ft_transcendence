"use client";
import { useSession } from "next-auth/react";
import LoadingPage from "../../../../loading";
import ChannelForm from "@components/atoms/chat/ChannelForm";
import { redirect } from "next/navigation";
import Layout from "@components/templates/Layout";
import { Suspense } from "react";
import { useChannel } from "../../channelService";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Modal from "@components/atoms/Modal";
import Button from "@components/atoms/Button";

interface UpdateChannelProps {
  token: string | unknown;
  id: string;
}
function UpdateChannel({ token, id }: UpdateChannelProps) {
  const { data: defaultChannel } = useChannel(id, token);

  return (
    <ChannelForm
      title="Update Channel"
      defaultChannel={defaultChannel}
      token={token}
      formType="update"
    />
  );
}

interface updateChannelProps {
  params: {
    id: string;
  };
}

function Page({ params }: updateChannelProps) {
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
              <UpdateChannel token={session?.user.accessToken} id={params.id} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Layout>
  );
}

export default Page;
