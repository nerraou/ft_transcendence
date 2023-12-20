"use client";

import FormProfile from "@molecules/Settings/FormProfile";
import { Tab } from "@headlessui/react";
import FormEmail from "@molecules/Settings/FormEmail";
import FormPassword from "@molecules/Settings/FormPassword";
import clsx from "clsx";

interface FormProps {
  jwt: string | unknown;
  username: string;
  firstName: string;
  lastName: string;
  is2faEnabled: boolean;
  email: string;
}

function SettingsTabs(props: FormProps) {
  const tabListStyle = clsx(
    "outline-none focus:bg-light-bg-tertiary rounded-xl lg:rounded-base md:rounded-base sm:rounded-base",
    "w-52 lg:w-60 md:w-60 sm:w-60 text-light-fg-primary hover:bg-light-fg-tertiary/[0.40]",
    "text-left lg:text-center md:text-center sm:text-center p-2 lg:p-2 md:p-2 sm:p-2 pl-8 lg:pl-0 md:pl-0 md:pl-0 dark:text-light-fg-tertiary",
    "dark:focus:text-light-fg-primary text-base ui-selected:bg-light-bg-tertiary",
  );

  return (
    <div className="flex lg:flex-col md:flex-col sm:flex-col">
      <Tab.Group vertical>
        <Tab.List className="flex flex-col lg:flex-row md:flex-row sm:flex-row lg:justify-between md:justify-between mr-10 xl:mr-5 lg:mr-0 md:mr-0 sm:mr-0 lg:mb-3 md:mb-3 sm:mb-3 space-y-1 lg:space-x-1 md:space-x-1 sm:space-x-1 p-1">
          <Tab className={tabListStyle}>Profile</Tab>
          <Tab className={tabListStyle}>Email</Tab>
          <Tab className={tabListStyle}>Password</Tab>
        </Tab.List>
        <Tab.Panels className="p-10 px-20 xl:p-5 lg:p-5 sm:p-5 xl:mb-8 lg:mb-6 md:p-5 md:mb-6 sm:mb-6 border-solid border-4 border-light-fg-primary dark:border-dark-fg-primary rounded-b-xl">
          <Tab.Panel>
            <FormProfile
              firstName={props.firstName}
              lastName={props.lastName}
              username={props.username}
              is2faEnabled={props.is2faEnabled}
              jwt={props.jwt}
            />
          </Tab.Panel>
          <Tab.Panel>
            <FormEmail jwt={props.jwt} email={props.email} />
          </Tab.Panel>
          <Tab.Panel>
            <FormPassword jwt={props.jwt} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default SettingsTabs;
