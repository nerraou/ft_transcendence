import ButtonCircle from "@atoms/ButtonCircle";
import Restore from "@icons/outline/Restore";
import Save from "@icons/outline/Save";

function ButtonsSaveRestore() {
  return (
    <div className="flex space-x-32 justify-end mr-20">
      <ButtonCircle color="bg-light-fg-link" icon={<Save />} />
      <ButtonCircle color="bg-light-fg-link" icon={<Restore />} />
    </div>
  );
}

export default ButtonsSaveRestore;
