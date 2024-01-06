import ButtonSignOut from "@components/atoms/ButtonSignOut";
import Loading from "@components/atoms/icons/outline/Loading";
import NotificatinList from "@components/molecules/NotificationList";
import { Popover, Transition } from "@headlessui/react";
import { Fragment, ReactNode, Suspense } from "react";

interface NotificationPopoverProps {
  button: ReactNode;
  jwt: string | unknown;
  onSignOut: () => void;
}

export default function NotificationPopover(props: NotificationPopoverProps) {
  return (
    <Popover className="relative">
      <Popover.Button className="outline-none">{props.button}</Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-10 w-80 right-0 bg-light-fg-link rounded-lg p-4">
          <div className="flex justify-end mb-4">
            <ButtonSignOut onClick={props.onSignOut} />
          </div>

          <Suspense
            fallback={
              <div className="flex justify-center">
                <Loading height="h-5" width="w-5" />
              </div>
            }
          >
            <NotificatinList jwt={props.jwt} />
          </Suspense>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
