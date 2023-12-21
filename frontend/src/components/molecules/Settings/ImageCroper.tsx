import { ChangeEvent, useState } from "react";
import { getCroppedImg, getRotatedImage } from "./ImageCroperCanvasUtils";
import ImageDailog from "./ImageDailog";
import Cropper, { Area } from "react-easy-crop";
import Button from "@components/atoms/Button";
import { Orientation, getOrientation } from "get-orientation/browser";

const ORIENTATION_TO_ANGLE: keyof Orientation = {
  3: 180,
  6: 90,
  8: -90,
};

export default function ImageCroper() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null);

  const onCropComplete = (area: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  };

  const showCroppedImage = async () => {
    try {
      if (!imageSrc || !croppedAreaPixels) {
        return;
      } else {
        const croppedImg = await getCroppedImg(
          imageSrc,
          croppedAreaPixels,
          rotation,
        );
        setCroppedImage(croppedImg);
      }
    } catch (e) {
      //   console.error(e);
    }
  };

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      try {
        // apply rotation if needed
        const orientation = await getOrientation(file);
        const rotationAngle = ORIENTATION_TO_ANGLE[orientation];
        if (rotation) {
          imageDataUrl = await getRotatedImage(imageDataUrl, rotationAngle);
          setImageSrc(imageDataUrl);
        }
      } catch {
        console.warn("failed to detect the orientation");
      }
    }
  };

  return (
    <div>
      {imageSrc ? (
        <>
          <div>
            <div className="relative w-96 h-96">
              <Cropper
                image={imageSrc}
                crop={crop}
                rotation={rotation}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <input
              type="range"
              min={1}
              max={3}
              onChange={(e) => setZoom(e.target.value)}
            />

            <input
              type="range"
              min={0}
              max={300}
              onChange={(e) => setRotation(e.target.value)}
            />

            <Button text="Show" onClick={showCroppedImage} />
          </div>
          {croppedImage && <ImageDailog image={croppedImage} />}
        </>
      ) : (
        <input type="file" onChange={onFileChange} accept="image/*" />
      )}
    </div>
  );
}

function readFile(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}
