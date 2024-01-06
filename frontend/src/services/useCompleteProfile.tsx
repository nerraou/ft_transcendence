import { useUserProfileQuery } from "./useUserProfileQuery";
import { usePathname, useRouter } from "next/navigation";

const useCompleteProfile = (token: string | unknown) => {
  const { data: user } = useUserProfileQuery(token);
  const router = useRouter();
  const pathname = usePathname();

  let complete = true;
  if (
    (user && user.username === null) ||
    user.lastName === null ||
    user.firstName === null
  ) {
    if (pathname !== "/profile/settings") {
      complete = false;
    }
  }

  const onClick = () => {
    router.push("/profile/settings");
  };

  return {
    isProfileComplete: complete,
    onClick,
  };
};

export default useCompleteProfile;
