import Layout from "@templates/Layout";
import UserHeader from "@molecules/profile/UserHeader";
import Bar from "@atoms/decoration/Bar";
import UserAchievements from "@molecules/profile/UserAchievements";
import GameHistoryBrief from "@organisms/GameHistoryBrief";
import StatsBar from "@molecules/profile/StatsBar";
import ButtonPlay from "@components/atoms/ButtonPlay";
import ButtonHistory from "@components/atoms/ButtonHistory";

function ProfilePage() {
  return (
    <Layout>
      <div className="flex flex-col p-8 space-y-16">
        <UserHeader
          fullname="Nouhayla Erraou"
          username="noface"
          image="/noface.jpg"
          isProfileOwner={false}
          isFriend
          level={2}
          userStatus="in-game"
        />
        <Bar width="w-5/6" />
        <StatsBar wins={45} losses={55} matches={100} />
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
          profileOwner={{ name: "noface", image: "/noface.jpg" }}
          results={[
            { name: "anime", state: "lose", image: "/anime.jpg" },
            { name: "totoro", state: "win", image: "/totoro.jpg" },
            { name: "avatar", state: "lose", image: "/avatar.png" },
            { name: "totoro", state: "win", image: "/totoro.jpg" },
          ]}
        />
      </div>
      <div className="flex justify-around my-10">
        <ButtonPlay backgroundColor="bg-light-bg-secondary" />
        <ButtonHistory backgroundColor=" bg-light-bg-secondary" />
      </div>
    </Layout>
  );
}

export default ProfilePage;
