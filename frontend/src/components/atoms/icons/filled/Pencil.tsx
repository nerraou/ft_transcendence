import clsx from "clsx";
import PencilOutline from "@icons/outline/Pencil";

interface pencilProps {
  color: string;
  backgroundColor: string;
}

function Pencil(props: pencilProps) {
  return (
    <div
      className={clsx(
        props.backgroundColor,
        "w-8 h-8 rounded-lg inline-flex justify-center items-center",
      )}
    >
      <PencilOutline color={props.color} />
    </div>
  );
}

export default Pencil;
