import { useMutation } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";

interface FormInput {
  email: string;
  password: string;
}

async function singUpUser(newUser: FormInput) {
  const api = process.env.NEXT_PUBLIC_API_BASE_URL + "/auth/sign-up";

  return await fetch(api, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(newUser),
  });
}

function UseSignUpMutation() {
  const mutation = useMutation({
    mutationFn: singUpUser,
  });
  const onSubmit: SubmitHandler<FormInput> = (data) => mutation.mutate(data);

  return onSubmit;
}

export default UseSignUpMutation;
