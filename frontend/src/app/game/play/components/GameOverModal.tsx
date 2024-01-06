"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "@components/atoms/Button";
import clsx from "clsx";
import Logo from "@components/atoms/icons/Logo";
import SittingLogo from "@components/atoms/icons/SittingLogo";

export type GameOverStatus = "win" | "lose" | "aborted" | "abandoned";

interface GameOverModalProps {
  isOpen: boolean;
  status: GameOverStatus;
  onClose: () => void;
  onNewGame: () => void;
  onRematch: () => void;
}

export default function GameOverModal(props: GameOverModalProps) {
  function getStatusMessage() {
    if (props.status == "win") {
      return "YOU WON";
    } else if (props.status == "lose") {
      return "YOU LOST";
    }

    return "GAME ABORTED";
  }

  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        open={props.isOpen}
        onClose={props.onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-dark-fg-primary/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 sm:p-2">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                as="section"
                className="bg-light-bg-tertiary dark:bg-dark-bg-primary p-8 rounded-lg sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
              >
                <section className="flex flex-col items-center gap-4">
                  <output
                    className={clsx("text-xxl sm:text-xl", {
                      "text-light-accent": props.status == "win",
                      "text-light-fg-secondary":
                        props.status == "lose" || props.status == "aborted",
                    })}
                  >
                    {getStatusMessage()}
                  </output>
                  {props.status == "win" ? <Logo /> : <SittingLogo />}
                </section>

                <section className="flex justify-center gap-16 mt-8 md:gap-6 sm:flex-col sm:gap-3 items-center">
                  <Button text="New game" onClick={props.onNewGame} />
                  {props.status != "aborted" && (
                    <Button text="Rematch" onClick={props.onRematch} />
                  )}
                </section>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
