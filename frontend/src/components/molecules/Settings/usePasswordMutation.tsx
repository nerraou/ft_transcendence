import { useMutation } from "@tanstack/react-query";

import { FormInputPassword } from "./FormPassword";
import baseQuery, { RequestError } from "@utils/baseQuery";

async function PasswordForm(
  PasswordInput: FormInputPassword,
  token: string | unknown,
) {
  const api = process.env.NEXT_PUBLIC_API_BASE_URL + "/users/password";

  return await baseQuery(api, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(PasswordInput),
  });
}

function usePasswordMutation(token: string | unknown) {
  return useMutation<Response, RequestError, FormInputPassword>({
    mutationFn: (PasswordInput) => {
      return PasswordForm(PasswordInput, token);
    },
  });
}

export default usePasswordMutation;
