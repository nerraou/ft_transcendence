"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import Bar from "@atoms/decoration/Bar";
import EditImage from "@molecules/Settings/EditImage";
import UserHeader from "@molecules/profile/UserHeader";
import SettingsTabs from "@organisms/SettingsTabs";
import Layout from "@templates/Layout";

import LoadingPage from "../../loading";
import { useUserProfileQuery } from "@services/useUserProfileQuery";
import Loading from "../../loading";

function Settings() {
  const { data: session, status: sessionStatus } = useSession();
  const token = session?.user.accessToken;
  const imageUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/assets/images/";

  const { data, status } = useUserProfileQuery(token);
  console.log(data);
  console.log(status);

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
        {status == "pending" && <Loading />}

        {status == "success" && (
          <UserHeader
            fullname={data.firstName + " " + data.lastName}
            image={imageUrl + data.avatarPath}
            isProfileOwner={true}
            isFriend
            level={2}
            userStatus="ONLINE"
            username={data?.username}
          />
        )}
        <Bar width="w-5/6" />
        <div className="flex justify-center">
          {status == "success" && (
            <EditImage image={imageUrl + data.avatarPath} />
          )}
        </div>
        {status == "success" && (
          <SettingsTabs
            firstName={data.firstName}
            lastName={data.lastName}
            username={data.username}
            is2faEnabled={data.is2faEnabled}
            email={data.email}
            jwt={session?.user.accessToken}
          />
        )}
      </div>
    </Layout>
  );
}

export default Settings;
