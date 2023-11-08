import ButtonsSaveRestore from "./ButtonsSaveRestore";
import LableInputPassword from "./LableInputPassword";

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
      <ButtonsSaveRestore />
    </form>
  );
}

export default FormPassword;
