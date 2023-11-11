import Bar from "@components/atoms/decoration/Bar";
import UserHeader from "@molecules/profile/UserHeader";
import SettingsTabs from "@organisms/SettingsTabs";
import Layout from "@templates/Layout";

function Settings() {
  return (
    <Layout>
      <div className="flex flex-col p-8 space-y-16">
        {/* What are TypeScript Discriminated Unions */}

        <UserHeader
          fullname="Nouhayla Erraou"
          image="/totoro.jpg"
          isProfileOwner
          isFriend
          level={2}
          userStatus="online"
          username="noface"
        />
        <Bar width="w-5/6" />
        <SettingsTabs />
      </div>
    </Layout>
  );
}

export default Settings;
