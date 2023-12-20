import { useMutation, useQueryClient } from "@tanstack/react-query";

import { FormInputEmail } from "./FormEmail";
import baseQuery, { RequestError } from "@utils/baseQuery";

async function EmailForm(EmailInput: FormInputEmail, token: string | unknown) {
  const api = process.env.NEXT_PUBLIC_API_BASE_URL + "/users/email";

  return await baseQuery(api, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(EmailInput),
  });
}

function useEmailMutation(token: string | unknown) {
  const queryClient = useQueryClient();

  return useMutation<Response, RequestError, FormInputEmail>({
    mutationFn: (EmailInput) => {
      return EmailForm(EmailInput, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export default useEmailMutation;
