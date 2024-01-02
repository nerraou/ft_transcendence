"use client";
import { useSession } from "next-auth/react";
import LoadingPage from "../../../loading";
import ChannelForm, { ChannelType } from "@components/atoms/chat/ChannelForm";
import { redirect } from "next/navigation";
import Layout from "@components/templates/Layout";

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
      <ChannelForm
        title="Create Channel"
        defaultChannel={{
          name: "",
          description: "",
          imagePath: "",
          type: ChannelType.PUBLIC,
          password: "",
        }}
        token={session?.user.accessToken}
        formType="create"
      />
    </Layout>
  );
}

export default CreateChannel;
