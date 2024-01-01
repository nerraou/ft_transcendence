import ButtonCircle from "@atoms/ButtonCircle";
import Google from "@icons/outline/Google";
import Icon42 from "@icons/outline/Icon42";

interface ButtonOAuthProps {
  onGoogleAuthClick: () => void;
  on42AuthClick: () => void;
  loading: boolean;
}

function ButtonOAuth(props: ButtonOAuthProps) {
  return (
    <div className="inline-flex justify-between p-1 w-40 -rotate-32 sm:rotate-0 items-center bg-light-fg-link rounded-full border-4 border-light-fg-primary dark:border-dark-fg-primary">
      <ButtonCircle
        type="button"
        icon={<Icon42 />}
        color="bg-dark-bg-primary"
        loading={props.loading}
        onClick={props.on42AuthClick}
      />
      <ButtonCircle
        type="button"
        icon={<Google />}
        color="bg-dark-bg-primary"
        loading={props.loading}
        onClick={props.onGoogleAuthClick}
      />
    </div>
  );
}

export default ButtonOAuth;
