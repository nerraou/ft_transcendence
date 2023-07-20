import clsx from "clsx";
import PencilOutline from "@icons/outline/Pencil";
import { MouseEvent } from "react";

interface PencilProps {
  color: string;
  backgroundColor: string;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

function Pencil(props: PencilProps) {
  return (
    <div
      className={clsx(
        props.backgroundColor,
        "w-8 h-8 rounded-lg inline-flex justify-center items-center",
      )}
      onClick={props.onClick}
    >
      <PencilOutline color={props.color} />
    </div>
  );
}

export default Pencil;
