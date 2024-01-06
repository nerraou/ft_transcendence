import { Dialog, Transition } from "@headlessui/react";
import Pagination from "@components/atoms/Pagination";
import { Fragment } from "react";
import Image from "next/image";
import {
  RANKING_ROWS_PER_PAGE,
  useRankingQuery,
} from "@app/feed/feedApiService";
import { User } from "./Ranking";

interface RankingPlayerCardProps {
  user: User;
}

interface UsernameProps {
  fullName: string;
  username: string;
}

function Username(props: UsernameProps) {
  return (
    <div className="flex flex-col">
      <label className="text-light-fg-primary dark:text-dark-fg-tertiary text-xl sm:text-lg md:text-lg lg:text-lg sm:text-center">
        {props.fullName}
      </label>
      <label className="text-light-fg-secondary text-lg leading-none sm:text-lg md:text-lg sm:text-center">
        {props.username}
      </label>
    </div>
  );
}

interface UserImageProps {
  image: string;
}

function UserImage(props: UserImageProps) {
  return (
    <div className="relative shrink-0 w-32 h-32 lg:w-24 lg:h-24 md:w-20 md:h-20 sm:w-16 sm:h-16">
      <Image
        src={props.image}
        alt="user image"
        fill
        sizes="w-32 h-32 lg:w-24 lg:h-24 md:w-20 md:h-20 sm:w-16 sm:h-16"
        className="rounded-lg object-cover appearance-none"
      />
    </div>
  );
}

const RankingPlayerCard = ({ user }: RankingPlayerCardProps) => {
  const imageUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/assets/images/";

  return (
    <div className="flex items-start justify-between w-full bg-light-fg-tertiary dark:bg-dark-fg-primary p-4 rounded-lg gap-4">
      <div className="text-start">
        <div className="flex sm:flex-col sm:items-center gap-4 sm:gap-1 sm:w-full">
          <UserImage image={imageUrl + user.avatarPath} />
          <Username
            username={user.username}
            fullName={user.firstName + " " + user.lastName}
          />
        </div>
      </div>
      <div className="flex flex-row items-start justify-start text-light-fg-primary text-lg lg:text-base md:text-base sm:text-base dark:text-dark-fg-tertiary pl-2">
        <label>{user.rating}</label>
        <label className="mx-2"> | </label>
        <label>#{user.ranking}</label>
      </div>
    </div>
  );
};

export interface RankingModalProps {
  token: string | unknown;
  isOpen: boolean;
  onClose: () => void;
}

const RankingModal = ({ token, isOpen, onClose }: RankingModalProps) => {
  const { data: users, total, page, setPage } = useRankingQuery(token, false);

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
                  {users?.map((user, index) => (
                    <RankingPlayerCard key={index} user={user} />
                  ))}
                  {total === 0 && (
                    <div className="flex flex-col items-center justify-center w-full gap-4">
                      <label className="text-light-fg-primary dark:text-dark-fg-tertiary text-xl sm:text-lg md:text-lg lg:text-lg sm:text-center">
                        No users found.
                      </label>
                    </div>
                  )}

                  {total && total > 0 && (
                    <Pagination
                      page={page}
                      total={Math.ceil(total / RANKING_ROWS_PER_PAGE)}
                      onChange={(p) => setPage(p)}
                    />
                  )}
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
