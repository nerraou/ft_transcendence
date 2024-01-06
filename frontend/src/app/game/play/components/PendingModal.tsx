"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import Logo from "@components/atoms/icons/Logo";
import Button from "@components/atoms/Button";

interface PendingModalProps {
  isOpen: boolean;
  message: string;
  onCancel: () => void;
}

export default function PendingModal(props: PendingModalProps) {
  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          //
        }}
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
                className="bg-light-bg-tertiary dark:bg-dark-bg-primary p-8 rounded-lg sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl sm:px-2"
              >
                <section className="flex flex-col items-center gap-4">
                  <output className="text-xxl text-light-fg-tertiary sm:text-xl">
                    {props.message}
                  </output>

                  <div className="animate-bounce mt-4">
                    <Logo />
                  </div>

                  <section className="flex justify-center gap-16 mt-8">
                    <Button text="Cancel" onClick={props.onCancel} />
                  </section>
                </section>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
