import Pencil from "@icons/outline/Pencil";
import Image from "next/image";
import { Fragment, useRef, useState } from "react";
import ImageCroper from "./ImageCroper";
import useAvatarMutation from "./useAvatarMutation";
import { Dialog, Transition } from "@headlessui/react";
import { RequestError } from "@utils/baseQuery";

interface EditImageProps {
  jwt: string | unknown;
  image: string;
}

interface ErrorModalProps {
  error: RequestError | null;
  isOpen: boolean;
  onClose: () => void;
}

function ErrorModal(props: ErrorModalProps) {
  const completeDevRef = useRef(null);

  if (!props.error) {
    return null;
  }

  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog
        as="div"
        initialFocus={completeDevRef}
        className="relative z-10"
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
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex flex-col items-start  sm:items-n w-full max-w-max sm:p-4 p-10 rounded-lg bg-light-bg-tertiary dark:bg-dark-bg-primary space-y-8 lg:space-y-4 md:space-y-4 sm:space-y-4">
                {props.error?.response.status == 413 ? (
                  <span className="text-lg text-light-fg-primary">
                    Image too large, crop it please
                  </span>
                ) : (
                  <span className="text-lg text-light-fg-primary">
                    Somthing went wrong
                  </span>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function EditImage(props: EditImageProps) {
  const [file, setFile] = useState<File | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isError, isSuccess, isPending, error, reset } =
    useAvatarMutation(props.jwt);

  function onCloseErrorModal() {
    reset();
  }

  function onClose() {
    if (!isError) {
      setIsOpen(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      reset();
    }
  }

  function handleClick() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  return (
    <div className="flex flex-col justify-center items-center border-solid border-8 border-light-bg-secondary dark:border-light-fg-link rounded-lg bg-light-bg-tertiary max-w-max py-5 px-20">
      <div className="relative shrink-0 w-32 h-32 md:w-24 md:h-24 sm:w-20 sm:h-20 lg:w-16 lg:h-16">
        <Image
          src={props.image}
          alt="user image"
          fill
          sizes="w-32 h-32 md:w-24 md:h-24 sm:w-20 sm:h-20 lg:w-16 lg:h-16"
          className="rounded-lg object-cover appearance-none"
        />
      </div>
      <Pencil color="stroke-light-fg-primary" onClick={handleClick} />
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            setFile(files[0]);
            setIsOpen(true);
          }
        }}
      />
      {file && (
        <ImageCroper
          isSuccess={isSuccess}
          isPending={isPending}
          isOpen={isOpen}
          onClose={onClose}
          file={file}
          onCropComplete={(cropped) => {
            if (cropped) {
              mutate(cropped);
            }
          }}
        />
      )}
      <ErrorModal isOpen={isError} onClose={onCloseErrorModal} error={error} />
    </div>
  );
}

export default EditImage;
