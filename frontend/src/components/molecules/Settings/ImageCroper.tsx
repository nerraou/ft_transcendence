import { useEffect, useState } from "react";
import { getCroppedImg } from "./ImageCroperCanvasUtils";
import Cropper, { Area } from "react-easy-crop";
import Button from "@components/atoms/Button";

interface ImageCroperProps {
  file: File | undefined;
  onCropComplete: (image: Blob) => void;
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
        onChange={(e) => setRotation(parseFloat(e.currentTarget.value))}
      />

      <Button text="Show" onClick={showCroppedImage} />
    </div>
  );
}
