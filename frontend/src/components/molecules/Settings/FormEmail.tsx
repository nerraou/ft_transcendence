import ButtonsSaveRestore from "./ButtonsSaveRestore";
import LableInputPassword from "./LableInputPassword";
import LablaInputText from "./LableInputText";

function FormEmail() {
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
      <LablaInputText
        labelValue="Email"
        placeholder="Email"
        error={false}
        onChange={onChange}
      />
      <ButtonsSaveRestore />
    </form>
  );
}

export default FormEmail;
