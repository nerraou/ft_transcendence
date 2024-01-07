"use client";

import { ReactNode, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface ModalProps {
  title: string;
  description: string;
  action?: ReactNode | ReactNode[];
  isOpen: boolean;
  onClose?: () => void;
}

function noOp() {
  // no operation
}

function Modal(props: ModalProps) {
  const completeDevRef = useRef(null);

  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog
        as="div"
        initialFocus={completeDevRef}
        className="relative z-10"
        onClose={props.onClose || noOp}
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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex flex-col items-center justify-center w-full max-w-max p-10 sm:p-5 rounded-md bg-light-bg-tertiary border-solid border-2 border-light-fg-primary">
                <Dialog.Title className="text-xl text-light-fg-primary leading-6">
                  {props.title}
                </Dialog.Title>
                <Dialog.Description className="text-lg text-light-fg-link mt-4">
                  {props.description}
                </Dialog.Description>

                <div className="mt-5" ref={completeDevRef}>
                  {props.action}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
