"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import Bar from "@atoms/decoration/Bar";
import EditImage from "@molecules/Settings/EditImage";
import UserHeader from "@molecules/profile/UserHeader";
import SettingsTabs from "@organisms/SettingsTabs";
import Layout from "@templates/Layout";

import LoadingPage from "../../loading";
import { useUserProfileQuery } from "@services/useUserProfileQuery";
import { Fragment, Suspense } from "react";
import Modal from "@components/atoms/Modal";
import Button from "@components/atoms/Button";

interface SettingsProps {
  token: string | unknown;
}

function Settings(props: SettingsProps) {
  const imageUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/assets/images/";

  const { data } = useUserProfileQuery(props.token);

  return (
    <Fragment>
      <UserHeader
        fullname={data.firstName + " " + data.lastName}
        image={imageUrl + data.avatarPath}
        isProfileOwner={true}
        isFriend
        level={2}
        userStatus="ONLINE"
        username={data?.username}
      />

      <Bar width="w-5/6" />
      <div className="flex justify-center">
        <EditImage image={imageUrl + data.avatarPath} />
      </div>

      <SettingsTabs
        firstName={data.firstName}
        lastName={data.lastName}
        username={data.username}
        is2faEnabled={data.is2faEnabled}
        email={data.email}
        jwt={props.token}
      />
    </Fragment>
  );
}

export default function SettingsPage() {
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
      <div className="flex flex-col p-8 space-y-16">
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ resetErrorBoundary }) => (
                <Modal
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
            >
              <Suspense fallback={<LoadingPage />}>
                <Settings token={session?.user.accessToken} />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>
    </Layout>
  );
}
