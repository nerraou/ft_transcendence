import { useState } from "react";
import ButtonsSaveRestore from "./ButtonsSaveRestore";
import Enable2FA from "./Enable2FA";
import LabelInputText from "./LabelInputText";
import TFAModal from "./TFAModal";

function FormProfile() {
  const [enable2FA, setEnable2FA] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const current2FA = false;
  function onChange(value: boolean) {
    if (!current2FA && value) {
      setIsOpen(true);
    }
    setEnable2FA(true);
  }

  function onClick() {
    setIsOpen(false);
  }
  return (
    <form className="space-y-5">
      <LabelInputText
        labelValue="Username"
        placeholder="Username"
        error={false}
        onChange={() => {
          return;
        }}
      />
      <LabelInputText
        labelValue="First Name"
        placeholder="First Name"
        error={false}
        onChange={() => {
          return;
        }}
      />
      <LabelInputText
        labelValue="Last Name"
        placeholder="Last Name"
        error={false}
        onChange={() => {
          return;
        }}
      />
      <Enable2FA checked={enable2FA} onChange={onChange} />
      <TFAModal isOpen={isOpen} onClose={onClick} />
      <ButtonsSaveRestore />
    </form>
  );
}

export default FormProfile;
