"use client";

import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import OTPInput from "react-otp-input";
import clsx from "clsx";

import Button from "@atoms/Button";

interface ModalProps {
  isOpen: boolean;
  isPending: boolean;
  onVerify: (code: string) => void;
}

function noOp() {
  // no operation
}

export default function TOOTPModal(props: ModalProps) {
  const completeDevRef = useRef(null);
  const [otp, setOTP] = useState("");

  function onVerifyHandler() {
    props.onVerify(otp);
  }

  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog
        as="div"
        initialFocus={completeDevRef}
        className="relative z-10"
        onClose={noOp}
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
              <Dialog.Panel className="flex flex-col items-center justify-center w-full max-w-lg p-10 rounded-md bg-light-bg-tertiary border-solid border-2 border-light-fg-primary">
                <Dialog.Title className="text-xl text-light-fg-primary leading-6">
                  Authentication code
                </Dialog.Title>

                <div
                  className="mt-5 flex flex-col items-center"
                  ref={completeDevRef}
                >
                  <OTPInput
                    containerStyle="mb-4"
                    value={otp}
                    onChange={setOTP}
                    numInputs={6}
                    renderSeparator={<span className="w-2" />}
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    renderInput={({ className, style, ...rest }) => {
                      return (
                        <input
                          className={clsx(
                            className,
                            "w-12 h-12 rounded-md text-center border focus:border-2 focus:border-dark-bg-tertiary outline-none",
                          )}
                          {...rest}
                        />
                      );
                    }}
                  />
                  <Button
                    text="Verify"
                    onClick={onVerifyHandler}
                    loading={props.isPending}
                    disabled={otp.length != 6}
                  />
                </div>

                <Dialog.Description className="text-lg text-light-fg-link mt-4">
                  Open your two-factor authenticator (TOTP) app to view your
                  authentication code
                </Dialog.Description>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
