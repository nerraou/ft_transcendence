import Bar from "@atoms/decoration/Bar";
import EditImage from "@molecules/Settings/EditImage";
import UserHeader from "@molecules/profile/UserHeader";
import SettingsTabs from "@organisms/SettingsTabs";
import Layout from "@templates/Layout";

function Settings() {
  return (
    <Layout>
      <div className="flex flex-col p-8 space-y-16">
        <UserHeader
          fullname="Nouhayla Erraou"
          image="/totoro.jpg"
          isProfileOwner={false}
          isFriend
          level={2}
          userStatus="IN_GAME"
          username="noface"
        />
        <Bar width="w-5/6" />
        <div className="flex justify-center">
          <EditImage image="/totoro.jpg" />
        </div>
        <SettingsTabs />
      </div>
    </Layout>
  );
}

export default Settings;
