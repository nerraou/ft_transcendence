import { Dialog, Transition } from "@headlessui/react";
import Pagination from "@components/atoms/Pagination";
import { Fragment } from "react";
import User from "@components/atoms/UserCard";

interface User {
  fullName: string;
  username: string;
  image: string;
  points: number;
  rank: number;
}

interface RankingPlayerCardProps {
  user: User;
}

const RankingPlayerCard = ({ user }: RankingPlayerCardProps) => {
  return (
    <div className="flex items-start justify-between w-full bg-light-fg-tertiary dark:bg-dark-fg-primary p-4 rounded-lg">
      <div className="text-start">
        <User
          fullName={user.fullName}
          username={user.username}
          image={user.image}
          background="bg-light-fg-tertiary dark:bg-dark-fg-primary"
        />
      </div>
      <div className="flex flex-row items-start justify-start text-light-fg-primary text-lg dark:bg-dark-fg-tertiary pl-2">
        <label>{user.points}</label>
        <label className="mx-2"> | </label>
        <label>#{user.rank}</label>
      </div>
    </div>
  );
};

export interface RankingModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  page: number;
  onPageChange: (page: number) => void;
  total: number;
}

const RankingModal = ({
  isOpen,
  onClose,
  users,
  page,
  onPageChange,
  total,
}: RankingModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
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
              <Dialog.Panel
                className="flex flex-col items-center justify-center w-full max-w-max p-8 gap-8 rounded-lg bg-light-bg-tertiary dark:bg-dark-fg-primary min-w-min"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col items-center justify-center w-full gap-4">
                  {users.map((user, index) => (
                    <RankingPlayerCard key={index} user={user} />
                  ))}

                  <Pagination
                    page={page}
                    total={total}
                    onChange={onPageChange}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RankingModal;
