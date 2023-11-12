import ButtonsSaveRestore from "./ButtonsSaveRestore";
import LabelInputPassword from "./LabelInputPassword";
import LabelInputText from "./LabelInputText";

function FormEmail() {
  function onChange() {
    return;
  }

  return (
    <form className="space-y-5">
      <LabelInputPassword
        labelValue="Current Password"
        placeholder="Password"
        error={false}
        onChange={onChange}
      />
      <LabelInputText
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
