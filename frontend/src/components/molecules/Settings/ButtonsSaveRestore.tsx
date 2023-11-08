import ButtonCircle from "@atoms/ButtonCircle";
import Restore from "@atoms/icons/outline/Restore";
import Save from "@atoms/icons/outline/Save";

function ButtonsSaveRestore() {
  return (
    <div className="flex space-x-32 justify-end mr-20 ">
      <ButtonCircle color="bg-light-fg-link" icon={<Save />}></ButtonCircle>
      <ButtonCircle color="bg-light-fg-link" icon={<Restore />}></ButtonCircle>
    </div>
  );
}

export default ButtonsSaveRestore;
