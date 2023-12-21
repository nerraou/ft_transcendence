import { Fragment, useEffect, useRef, useState } from "react";
import { getCroppedImg } from "./ImageCroperCanvasUtils";
import Cropper, { Area } from "react-easy-crop";
import { Dialog, Transition } from "@headlessui/react";
import Button from "@components/atoms/Button";

interface ImageCroperProps {
  file: File | undefined;
  onCropComplete: (image: Blob) => void;
  isOpen: boolean;
  onClose: () => void;
}

function readFile(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => resolve(reader.result as string),
      false,
    );
    reader.readAsDataURL(file);
  });
}

export default function ImageCroper(props: ImageCroperProps) {
  const completeDevRef = useRef(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  useEffect(() => {
    if (props.file) {
      readFile(props.file)
        .then(setImageSrc)
        .catch(() => {
          // error
        });
    }
  }, [props.file]);

  function onCropComplete(area: Area, areaPixels: Area) {
    setCroppedAreaPixels(areaPixels);
  }

  async function showCroppedImage() {
    if (!imageSrc || !croppedAreaPixels) {
      return;
    }

    try {
      const croppendImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation,
      );
      props.onCropComplete(croppendImage);
    } catch (e) {
      //   console.error(e);
    }
  }

  if (!imageSrc) {
    return <p>Loading...</p>;
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
                <div>
                  <div className="relative w-96 h-96">
                    <Cropper
                      image={imageSrc}
                      crop={crop}
                      rotation={rotation}
                      zoom={zoom}
                      aspect={1}
                      onCropChange={setCrop}
                      onRotationChange={setRotation}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                    />
                  </div>
                  <input
                    type="range"
                    step={0.01}
                    min={1}
                    max={5}
                    value={zoom}
                    onChange={(e) => {
                      setZoom(parseFloat(e.currentTarget.value));
                    }}
                  />

                  <input
                    type="range"
                    min={0}
                    max={180}
                    value={rotation}
                    onChange={(e) =>
                      setRotation(parseFloat(e.currentTarget.value))
                    }
                  />

                  <Button text="Save" onClick={showCroppedImage} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
