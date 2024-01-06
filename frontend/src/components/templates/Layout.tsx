"use client";

import clsx from "clsx";
import { ReactNode, useMemo } from "react";
import { Toaster } from "react-hot-toast";

import Headphones from "@atoms/decoration/Headphones";
import ThemeSwitch from "@atoms/ThemeSwitch";
import useTheme, { Theme } from "@hooks/useTheme";
import useOnChallengeRecieved from "@hooks/useOnChallengeRecieved";
import { useUserProfileQuery } from "@services/useUserProfileQuery";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Logo from "@icons/Logo";
import { Popover, Transition } from "@headlessui/react";
import LoadingPage from "../../app/loading";
import useCompleteProfile from "@services/useCompleteProfile";
import Modal from "@components/atoms/Modal";
import Button from "@components/atoms/Button";
import BurgerMenu from "@icons/outline/BurgerMenu";
import NotificationPopover from "@organisms/NotificationPopover";

interface NavbarLink {
  title: string;
  link: string;
}
function getRoutes(username: string | null | undefined): NavbarLink[] {
  return [
    {
      title: "Profile",
      link: `/profile/${username}`,
    },
    {
      title: "Friends",
      link: `/friends`,
    },
    {
      title: "History",
      link: `/history/${username}`,
    },
    {
      title: "Chat",
      link: `/chat`,
    },
    {
      title: "Feed",
      link: `/feed`,
    },
    {
      title: "Settings",
      link: `/profile/settings`,
    },
    {
      title: "Game",
      link: `/game/make`,
    },
  ];
}

interface NavbarLinkActionProps {
  action: NavbarLink;
  router: any;
  menu?: boolean;
}

function NavbarLinkAction({ action, router, menu }: NavbarLinkActionProps) {
  return (
    <button
      className={clsx(
        "flex items-center px-4 py-2 rounded-sm gap-2 text-base font-medium text-light-fg-link dark:text-light-bg-tertiary hover:bg-light-bg-tertiary dark:hover:bg-dark-fg-primary",
        { "w-full": menu },
      )}
      onClick={() => router.push(action.link)}
    >
      {action.title}
    </button>
  );
}

interface ActionsMenuProps {
  actions: NavbarLink[];
  router: any;
}

function ActionsMenu({ actions, router }: ActionsMenuProps) {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="flex items-center justify-center w-10 h-10 rounded-full bg-light-fg-tertiary border-2 border-dark-fg-primary dark:border-light-bg-primary">
            <BurgerMenu />
          </Popover.Button>
          <Transition
            show={open}
            as={Popover.Panel}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-out duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            className="absolute z-10 w-56 max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl"
          >
            <Popover.Panel className="absolute z-10 right-20">
              <div className="w-60 overflow-hidden divide-solid divide-y-2 rounded-xl divide-dark-bg-primary dark:divide-light-bg-primary relative flex flex-col items-start justify-start p-3 bg-light-fg-tertiary dark:bg-dark-bg-primary sm:p-8 border-4 border-dark-bg-primary dark:border-light-bg-primary">
                {actions.map((action) => (
                  <NavbarLinkAction
                    key={action.link}
                    action={action}
                    router={router}
                    menu={true}
                  />
                ))}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

interface LayoutProps {
  children: ReactNode | ReactNode[];
}

interface NavbarProps {
  token?: string | unknown;
}
function NavBar({ token }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const { data: currentUser, isSuccess } = useUserProfileQuery(token);
  const routes = useMemo(
    () => getRoutes(currentUser?.username),
    [currentUser?.username],
  );

  return (
    <header className="relative h-20 border-b-4 border-b-light-fg-primary dark:border-b-dark-fg-primary">
      <Headphones reverse position="absolute top-0 left-16" />
      <nav className="flex items-center h-full border-l-4 border-l-light-fg-tertiary">
        <ThemeSwitch
          margin="ml-20"
          position="self-end"
          checked={theme?.value == Theme.DARK}
          onChange={toggleTheme}
        />
        <div className="flex-grow" />
        {isSuccess && (
          <div className="flex flex-grow items-center justify-end px-8 lg:hidden md:hidden sm:hidden">
            {routes.map((route: NavbarLink) => (
              <NavbarLinkAction
                key={route.link}
                action={route}
                router={router}
              />
            ))}
          </div>
        )}
        <div className="px-4 hidden lg:flex md:flex sm:flex">
          <ActionsMenu actions={routes} router={router} />
        </div>
        <div className="w-1 h-full bg-light-fg-tertiary" />
        <div className="flex items-center justify-center border-l-4 p-1 border-light-fg-primary dark:border-dark-fg-primary">
          <NotificationPopover
            jwt={token}
            onSignOut={signOut}
            button={
              <div className="flex items-center justify-center">
                <Logo width="w-14" height="h-14" />
              </div>
            }
          />
        </div>
      </nav>
    </header>
  );
}

interface LayoutContentProps {
  children: ReactNode | ReactNode[];
  token?: string | unknown;
}
function LayoutContent(props: LayoutContentProps) {
  useOnChallengeRecieved();

  const { isProfileComplete, onClick: redirect } = useCompleteProfile(
    props.token,
  );

  if (!isProfileComplete) {
    return (
      <Modal
        isOpen={!isProfileComplete}
        title="Welcom to BongBoy"
        description="please complete your profile to continue using the app"
        action={<Button text="Settings" onClick={redirect} />}
      />
    );
  }

  return (
    <>
      <NavBar token={props.token} />
      <section
        className={clsx(
          "flex-grow pb-10 bg-light-bg-primary dark:bg-dark-bg-primary",
          "relative h-full rounded-b-2xl border-t-4 border-l-4 border-light-fg-tertiary",
          "bg-[position:right_bottom_,_center_bottom,_left_-4px_bottom] bg-no-repeat",
          "bg-light-layout dark:bg-dark-layout",
        )}
      >
        {props.children}
      </section>
    </>
  );
}

export default function Layout(props: LayoutProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <LoadingPage
        bgColor=" bg-light-bg-tertiary dark:bg-dark-bg-primary"
        width="w-screen"
        height="h-screen"
      />
    );
  }

  return (
    <main className="relative flex min-h-screen p-4 bg-light-bg-primary dark:bg-dark-bg-primary">
      <section
        className={clsx(
          "relative container flex-1 flex flex-col mx-auto border-4 rounded-b-2xl",
          "border-light-fg-primary dark:border-dark-fg-primary",
        )}
      >
        <LayoutContent token={session?.user.accessToken}>
          {props.children}
        </LayoutContent>
      </section>
      <Toaster position="top-right" />
    </main>
  );
}
