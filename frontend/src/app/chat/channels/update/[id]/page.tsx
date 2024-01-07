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
import SittingLogo from "@components/atoms/icons/SittingLogo";

interface UpdateChannelProps {
  token: string | unknown;
  id: string;
}
function UpdateChannel({ token, id }: UpdateChannelProps) {
  const { data: defaultChannel } = useChannel(id, token);

  return (
    <>
      {defaultChannel.isOwner ? (
        <ChannelForm
          title="Update Channel"
          defaultChannel={defaultChannel}
          token={token}
          formType="update"
        />
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <p className="text-light-fg-primary text-xl dark:text-light-fg-tertiary">
            You are not the owner of this channel
          </p>
          <SittingLogo />
        </div>
      )}
    </>
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
            fallbackRender={({ resetErrorBoundary, error }) => (
              <Modal
                isOpen
                title="Error"
                description={
                  error.response?.status === 403
                    ? `This channel does not exist`
                    : "Something went wrong"
                }
                action={
                  error.response?.status !== 403 ? (
                    <Button
                      text="Retry"
                      onClick={() => {
                        resetErrorBoundary();
                      }}
                    />
                  ) : null
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
