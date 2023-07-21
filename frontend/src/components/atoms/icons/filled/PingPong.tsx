import clsx from "clsx";
import PingPongOutline from "../outline/PingPong";
import { MouseEvent } from "react";

interface PingPongProps {
  color: string;
  backgroundColor: string;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

function PingPong(props: PingPongProps) {
  return (
    <div
      className={clsx(
        props.backgroundColor,
        "w-8 h-8 rounded-lg inline-flex justify-center items-center",
      )}
      onClick={props.onClick}
    >
      <PingPongOutline color={props.color} />
    </div>
  );
}

export default PingPong;
