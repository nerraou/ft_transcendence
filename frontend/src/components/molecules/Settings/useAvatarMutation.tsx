import { useMutation, useQueryClient } from "@tanstack/react-query";
import baseQuery, { RequestError } from "@utils/baseQuery";

async function editAvatar(avatarPath: Blob, token: string | unknown) {
  const api = process.env.NEXT_PUBLIC_API_BASE_URL + "/users/avatar";
  const formData = new FormData();

  formData.append("image", avatarPath);

  const response = await baseQuery(api, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const res = await response.json();

  return res;
}

function useAvatarMutation(token: string | unknown) {
  const queryClient = useQueryClient();
  return useMutation<Response, RequestError, Blob>({
    mutationFn: (avatarPath) => {
      return editAvatar(avatarPath, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export default useAvatarMutation;
