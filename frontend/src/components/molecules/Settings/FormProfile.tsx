import ButtonsSaveRestore from "./ButtonsSaveRestore";
import Enable2FA from "./Enable2FA";
import LableInputText from "./LableInputText";

function FormProfile() {
  function onChange() {
    return;
  }

  return (
    <form className="space-y-5">
      <LableInputText
        labelValue="Username"
        placeholder="name"
        error={false}
        onChange={onChange}
      />
      <LableInputText
        labelValue="First Name"
        placeholder="First Name"
        error={false}
        onChange={onChange}
      />
      <LableInputText
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
