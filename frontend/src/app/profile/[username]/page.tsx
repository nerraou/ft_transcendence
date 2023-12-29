"use client";
import Layout from "@templates/Layout";
import UserHeader from "@molecules/profile/UserHeader";
import UserAchievements from "@molecules/profile/UserAchievements";
import GameHistoryBrief from "@organisms/GameHistoryBrief";
import StatsBar from "@molecules/profile/StatsBar";
import ButtonPlay from "@components/atoms/ButtonPlay";
import ButtonHistory from "@components/atoms/ButtonHistory";
import BarRating from "@components/atoms/BarRating";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Modal from "@components/atoms/Modal";
import Button from "@components/atoms/Button";
import { Suspense } from "react";
import LoadingPage from "../../loading";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useProfile } from "./userProfile";
import { useRouter } from "next/navigation";

const imageUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/assets/images/";

interface ProfileProps {
  token: string | unknown;
  username: string;
}

function Profile({ token, username }: ProfileProps) {
  const {
    data: { user, history },
  } = useProfile(token, username);
  const router = useRouter();

  return (
    <>
      {!user ? (
        <Modal
          isOpen
          title="Error"
          description="This user does not exist"
          action={
            <Button
              text="Go to feed"
              onClick={() => {
                router.push("/feed");
              }}
            />
          }
        />
      ) : (
        <>
          <div className="flex flex-col p-8 space-y-16">
            <UserHeader
              fullname={user.firstName + " " + user.lastName}
              username={user.username}
              image={imageUrl + user.avatarPath}
              id={user.id}
              isProfileOwner={false}
              isFriend
              level={user.ranking}
              userStatus={user.status}
            />
            <BarRating rating={user.rating} />
            <StatsBar
              wins={user.gamesStats.wins}
              losses={user.gamesStats.losses}
              matches={user.gamesStats.wins + user.gamesStats.losses}
            />
            <div className="self-center w-4/6 sm:w-full">
              <UserAchievements
                achievements={[
                  "CleanSheet",
                  "FirstWin",
                  "FiveWins",
                  "OneHundredWins",
                  "FirstRanked",
                  "SecondRanked",
                  "ThirdRanked",
                  "LastRanked",
                ]}
              />
            </div>
            <GameHistoryBrief
              profileOwner={{
                name: user.username,
                image: imageUrl + user.avatarPath,
              }}
              results={history.games.map((match) => ({
                name: match.opponent.username,
                state:
                  match.player.score > match.opponent.score ? "win" : "lose",
                image: imageUrl + match.opponent.avatarPath,
              }))}
            />
          </div>
          <div className="flex justify-around my-10">
            <ButtonPlay backgroundColor="bg-light-bg-secondary" />
            <ButtonHistory
              backgroundColor=" bg-light-bg-secondary"
              onClick={() => router.push(`/history/${user.username}`)}
            />
          </div>
        </>
      )}
    </>
  );
}

interface HistoryPageProps {
  params: {
    username: string;
  };
}

export default function ProfilePage({ params }: HistoryPageProps) {
  const { data: session, status: sessionStatus } = useSession();

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
              <Profile
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
