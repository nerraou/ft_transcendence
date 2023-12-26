import { Dialog, Transition } from "@headlessui/react";
import Button from "./Button";
import { Fragment } from "react";

interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
}

function CustomModal(props: ModalProps) {
  const { title, description, isOpen, onClose } = props;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <div className="fixed inset-0 overflow-y-auto bg-dark-fg-primary/60">
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
              <Dialog.Panel
                className="flex flex-col items-center justify-center w-full max-w-max p-8 gap-8 rounded-lg bg-light-bg-tertiary dark:bg-dark-bg-primary min-w-min"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col items-center justify-center w-full gap-4">
                  <label className="text-light-fg-primary dark:text-dark-fg-tertiary text-xl xl:text-xl 2xl:text-xl sm:text-xl md:text-xl lg:text-xl sm:text-center">
                    {title}
                  </label>
                  <label className="text-light-fg-primary dark:text-dark-fg-tertiary text-xl sm:text-lg md:text-lg lg:text-lg sm:text-center">
                    {description}
                  </label>
                </div>
                <div className="flex justify-center w-full gap-4">
                  <Button
                    text="Close"
                    onClick={() => {
                      onClose();
                    }}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default CustomModal;
