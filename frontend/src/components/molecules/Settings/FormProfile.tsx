import ButtonsSaveRestore from "./ButtonsSaveRestore";
import Enable2FA from "./Enable2FA";
import LablaInputText from "./LableInputText";

function FormProfile() {
  function onChange() {
    return;
  }
  return (
    <form className="space-y-5">
      <LablaInputText
        labelValue="Username"
        placeholder="name"
        error={false}
        onChange={onChange}
      />
      <LablaInputText
        labelValue="First Name"
        placeholder="First Name"
        error={false}
        onChange={onChange}
      />{" "}
      <LablaInputText
        labelValue="Last Name"
        placeholder="Last Name"
        error={false}
        onChange={onChange}
      />
      <Enable2FA onChange={onChange} />
      <ButtonsSaveRestore />
    </form>
  );
}

export default FormProfile;
