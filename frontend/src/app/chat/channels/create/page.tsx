"use client";
import { useSession } from "next-auth/react";
import LoadingPage from "../../../loading";
import ChannelForm, { ChannelType } from "@components/atoms/chat/ChannelForm";
import { redirect } from "next/navigation";
import Layout from "@components/templates/Layout";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Modal from "@components/atoms/Modal";
import Button from "@components/atoms/Button";

function CreateChannelForm({ token }: { token: string | unknown }) {
  return (
    <ChannelForm
      title="Create Channel"
      defaultChannel={{
        name: "",
        description: "",
        imagePath: "",
        type: ChannelType.PUBLIC,
        password: "",
      }}
      token={token}
      formType="create"
    />
  );
}

function CreateChannel() {
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
            <CreateChannelForm token={session?.user.accessToken} />
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Layout>
  );
}

export default CreateChannel;
