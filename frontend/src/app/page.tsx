"use client";

import Link from "next/link";
const GameBoard = dynamic(() => import("./game/make/components/GameBoard"), {
  ssr: false,
});

import dynamic from "next/dynamic";
import SittingLogo from "@components/atoms/icons/SittingLogo";
import Logo from "@components/atoms/icons/Logo";
import { useSession } from "next-auth/react";
import LoadingPage from "./loading";

export default function Home() {
  const { status: sessionStatus } = useSession();

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
    <main className="w-max-w space-y-4 flex flex-col justify-center items-center p-8 text-xxl text-light-fg-primary dark:text-light-bg-tertiary bg-light-fg-tertiary dark:bg-dark-bg-primary">
      <h1 className="text-center dark:text-light-bg-tertiary text-light-fg-primarytext-xxl">
        Welcome To PongBoy
      </h1>
      <div className="flex space-x-96 md:space-x-40 sm:space-x-16">
        {sessionStatus === "unauthenticated" ? (
          <>
            <div className="flex flex-col">
              <SittingLogo />
              <Link href="/sign-up">
                <button className="w-56 sm:w-full p-4 text-base text-center text-light-bg-tertiary bg-light-fg-link border rounded-lg border-light-fg-primary">
                  Create acount
                </button>
              </Link>
            </div>
            <div className="flex flex-col">
              <Logo />
              <Link href="/sign-in">
                <button className="w-56 sm:w-full p-4 text-center text-base text-light-fg-link rounded-lg border border-light-fg-primary bg-light-bg-secondary">
                  Sign in
                </button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col">
              <Logo />
              <Link href="/feed">
                <button className="w-56 sm:w-full p-4 text-center text-base text-light-fg-link rounded-lg border border-light-fg-primary bg-light-bg-secondary">
                  Feed
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
      <GameBoard
        margin="mt-16 mb-16"
        position="m-auto"
        width={650}
        height={480}
        paddleColor="#E94635"
        boardColor="#FDEECD"
      />
      <article
        className="block self-center text-lg text-dark-bg-primary dark:text-light-fg-link border-4 bg-light-fg-tertiary rounded-lg p-8
		border-dark-fg-primary"
      >
        <h1>
          This is a game where you will find yourself inside a GameBoy and your
          mission is to be the best Ponger ever!
        </h1>
        <ul>
          First, choose your way to create your account
          <li>Email and password</li>
          <li>Google or 42 acount</li>
        </ul>
        <ul>
          what is waiting for you?
          <li>
            Settings page where you can update all your personal information as
            your avarate in case you did not like the default one
          </li>
          <li>
            Profile here you can see all your information for example your
            achievements
          </li>
          <li>Friends page where you can find all your friends</li>
        </ul>
      </article>
    </main>
  );
}
