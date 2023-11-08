import FormProfile from "@molecules/Settings/FormProfile";
import { Tab } from "@headlessui/react";
import FormEmail from "@molecules/Settings/FormEmail";
import FormPassword from "@molecules/Settings/FormPassword";

function SettingsTabs() {
  const tabListStyle =
    "outline-none focus:bg-light-bg-tertiary rounded-xl w-52 text-light-fg-primary hover:bg-light-fg-tertiary/[0.40] text-left p-2 pl-8";
  return (
    <div className="flex bg-light-bg-primary">
      <Tab.Group>
        <Tab.List className="flex flex-col mr-10 space-y-1 p-1">
          <Tab className={tabListStyle}>Profile</Tab>
          <Tab className={tabListStyle}>Email</Tab>
          <Tab className={tabListStyle}>Password</Tab>
        </Tab.List>
        <Tab.Panels className="p-8 border-solid border-4 border-light-fg-primary rounded-b-xl">
          <Tab.Panel>
            <FormProfile />
          </Tab.Panel>
          <Tab.Panel>
            <FormEmail />
          </Tab.Panel>
          <Tab.Panel>
            <FormPassword />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default SettingsTabs;
