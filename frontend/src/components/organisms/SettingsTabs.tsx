"use client";

import FormProfile from "@molecules/Settings/FormProfile";
import { Tab } from "@headlessui/react";
import FormEmail from "@molecules/Settings/FormEmail";
import FormPassword from "@molecules/Settings/FormPassword";

function SettingsTabs() {
  const tabListStyle =
    "outline-none focus:bg-light-bg-tertiary rounded-xl w-52 lg:w-40 text-light-fg-primary hover:bg-light-fg-tertiary/[0.40] text-left p-2 pl-8 dark:text-light-fg-tertiary dark:focus:text-light-fg-primary text-base ui-selected:bg-light-bg-tertiary";

  return (
    <div className="flex ">
      <Tab.Group vertical>
        <Tab.List className="flex flex-col mr-10 xl:mr-5 lg:mr-4 space-y-1 p-1 lg:p-0">
          <Tab className={tabListStyle}>Profile</Tab>
          <Tab className={tabListStyle}>Email</Tab>
          <Tab className={tabListStyle}>Password</Tab>
        </Tab.List>
        <Tab.Panels className="p-10 px-20 xl:p-5 lg:p-5 border-solid border-4 border-light-fg-primary dark:border-dark-fg-primary rounded-b-xl">
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
