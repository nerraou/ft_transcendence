import { useMutation, useQueryClient } from "@tanstack/react-query";
import baseQuery, { RequestError } from "@utils/baseQuery";

import { FormInputProfile } from "./FormProfile";

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
  const queryClient = useQueryClient();
  return useMutation<Response, RequestError, FormInputProfile>({
    mutationFn: (profileInput) => {
      return profileForm(profileInput, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export default useProfileMutation;
