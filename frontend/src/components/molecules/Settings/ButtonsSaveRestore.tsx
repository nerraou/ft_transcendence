import ButtonCircle from "@atoms/ButtonCircle";
import Restore from "@icons/outline/Restore";
import Save from "@icons/outline/Save";

import { MouseEvent } from "react";

interface ButtonsSaveRestoreProps {
  isSaveLoading: boolean;
  isSavePenging: boolean;
  isRestoreLoading?: boolean;
  isRestorePending?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

function ButtonsSaveRestore(props: ButtonsSaveRestoreProps) {
  return (
    <div className="flex justify-end sm:justify-between space-x-32 sm:space-x-0 mr-20 sm:mr-0">
      <ButtonCircle
        color="bg-light-fg-link"
        icon={<Save />}
        disabled={props.isSavePenging}
        loading={props.isSaveLoading}
        type="submit"
      />
      <ButtonCircle
        color="bg-light-fg-link"
        type="button"
        icon={<Restore />}
        disabled={props.isRestorePending}
        loading={props.isRestorePending}
        onClick={props.onClick}
      />
    </div>
  );
}

export default ButtonsSaveRestore;
