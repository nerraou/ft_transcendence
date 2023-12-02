import { useMutation } from "@tanstack/react-query";

import { FormInput } from "./SignUp";

async function singUpUser(newUser: FormInput) {
  const api = process.env.NEXT_PUBLIC_API_BASE_URL + "/auth/sign-up";

  return await fetch(api, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(newUser),
  });
}

function useSignUpMutation() {
  const mutation = useMutation({
    mutationFn: singUpUser,
  });

  return mutation;
}

export default useSignUpMutation;
