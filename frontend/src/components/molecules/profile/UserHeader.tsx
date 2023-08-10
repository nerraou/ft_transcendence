import BarStatus from "@components/atoms/BarStatus";
import UserCheck from "@components/atoms/icons/outline/UserCheck";
import User from "@components/atoms/user-header/User";

function UserHeader() {
  return (
    <div className="box-border h-80 rounded-xl border-4 border-light-fg-primary bg-light-fg-link">
      <BarStatus
        width="w-2/3"
        reverse={false}
        marginX="mx-12"
        marginY="my-base"
      />
      <div className="relative flex justify-between h-56 mb-xxl mt-sm mx-12 pt-xl px-xl bg-light-bg-tertiary border-4 border-light-fg-primary rounded-xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <label className="animate-ping text-xl text-light-bg-primary">
            Playing...
          </label>
        </div>

        <User
          fullName="Nouhayla Erraou"
          username="totoro"
          image="/totoro.jpeg"
        />
        <div className="flex">
          <UserCheck color="stroke-light-fg-primary" />
        </div>
      </div>
    </div>
  );
}

export default UserHeader;
