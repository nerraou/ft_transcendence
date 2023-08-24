import ButtonCircle from "@atoms/ButtonCircle";
import Google from "@icons/outline/Google";
import Icon42 from "@icons/outline/Icon42";

function ButtonOAuth() {
  return (
    <div className="inline-flex justify-between p-1 w-40 -rotate-45 items-center bg-light-fg-link rounded-full border-4 border-light-fg-primary dark:border-dark-fg-primary">
      <ButtonCircle icon={<Icon42 />} color="bg-dark-bg-primary" />
      <ButtonCircle icon={<Google />} color="bg-dark-bg-primary" />
    </div>
  );
}

export default ButtonOAuth;
