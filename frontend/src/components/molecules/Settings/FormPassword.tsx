import LableInputPassword from "./LableInputPassword";
import ButtonCircle from "@atoms/ButtonCircle";
import Save from "@atoms/icons/outline/Save";

function FormPassword() {
  function onChange() {
    return;
  }

  return (
    <form className="space-y-5">
      <LableInputPassword
        labelValue="Current Password"
        placeholder="Password"
        error={false}
        onChange={onChange}
      />
      <LableInputPassword
        labelValue="New Password"
        placeholder="Password"
        error={false}
        onChange={onChange}
      />
      <div className="flex justify-center ml-20 sm:ml-0">
        <ButtonCircle color="bg-light-fg-link" icon={<Save />} />
      </div>
    </form>
  );
}

export default FormPassword;
