import ButtonsSaveRestore from "./ButtonsSaveRestore";
import Enable2FA from "./Enable2FA";
import LabelInputText from "./LabelInputText";

function FormProfile() {
  function onChange() {
    return;
  }

  return (
    <form className="space-y-5">
      <LabelInputText
        labelValue="Username"
        placeholder="Username"
        error={false}
        onChange={onChange}
      />
      <LabelInputText
        labelValue="First Name"
        placeholder="First Name"
        error={false}
        onChange={onChange}
      />
      <LabelInputText
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
