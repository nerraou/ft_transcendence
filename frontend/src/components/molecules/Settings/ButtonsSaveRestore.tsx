import ButtonCircle from "@atoms/ButtonCircle";
import Restore from "@icons/outline/Restore";
import Save from "@icons/outline/Save";

function ButtonsSaveRestore() {
  return (
    <div className="flex justify-end sm:justify-between space-x-32 sm:space-x-0 mr-20 sm:mr-0">
      <ButtonCircle color="bg-light-fg-link" icon={<Save />} />
      <ButtonCircle color="bg-light-fg-link" icon={<Restore />} />
    </div>
  );
}

export default ButtonsSaveRestore;
