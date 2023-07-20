import clsx from "clsx";
import EmailOutline from "@icons/outline/Email";
import { MouseEvent } from "react";

interface EmailProps {
  color: string;
  backgroundColor: string;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

function Email(props: EmailProps) {
  return (
    <div
      className={clsx(
        props.backgroundColor,
        "w-8 h-8 rounded-lg inline-flex justify-center items-center",
      )}
      onClick={props.onClick}
    >
      <EmailOutline color={props.color} />
    </div>
  );
}
export default Email;
