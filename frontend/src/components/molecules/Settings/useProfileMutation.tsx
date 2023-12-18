import { useMutation } from "@tanstack/react-query";

import { FormInputProfile } from "./FormProfile";
import baseQuery, { RequestError } from "@utils/baseQuery";

async function profileForm(
  profileInput: FormInputProfile,
  token: string | unknown,
) {
  const api = process.env.NEXT_PUBLIC_API_BASE_URL + "/users/profile";

  return await baseQuery(api, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(profileInput),
  });
}

function useProfileMutation(token: string | unknown) {
  return useMutation<Response, RequestError, FormInputProfile>({
    mutationFn: (profileInput) => {
      return profileForm(profileInput, token);
    },
  });
}

export default useProfileMutation;
