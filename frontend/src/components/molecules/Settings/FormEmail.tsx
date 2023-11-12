import ButtonsSaveRestore from "./ButtonsSaveRestore";
import LableInputPassword from "./LabelInputPassword";
import LableInputText from "./LabelInputText";

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
      <LableInputText
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
