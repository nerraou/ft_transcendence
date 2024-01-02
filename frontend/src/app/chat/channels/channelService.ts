import { Channel, ChannelType } from "@components/atoms/chat/ChannelForm";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import baseQuery, { RequestError } from "@utils/baseQuery";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

async function createChannel(channel: Channel, token: string | unknown) {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/channels";

  const data = new FormData();
  data.append("name", channel.name);
  data.append("description", channel.description);
  data.append("type", channel.type);
  if (channel.type === ChannelType.PROTECTED) {
    data.append("password", channel.password || "");
  }
  if (channel.image) {
    data.append("image", channel.image);
  }
  const res = await baseQuery(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: data,
  });
  const response = await res.json();
  return response;
}

export function useCreateChannelMutation(token: string | unknown) {
  return useMutation<Channel, RequestError, { channel: Channel }>({
    mutationFn: ({ channel }) => createChannel(channel, token),
  });
}

export const channelSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string().required("Name is required"),
  description: yup
    .string()
    .min(10)
    .required("Description is required with min 10 characters"),
  type: yup.mixed<ChannelType>().required(),
  password: yup.string().when("type", ([type], schema) => {
    if (type === ChannelType.PROTECTED) {
      return schema.required("Password is required for protected channels");
    }
    return schema;
  }),
});

async function getChannel(id: string, token: string | unknown) {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + `/channels/${id}`;
  const res = await baseQuery(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const response = await res.json();
  return response;
}

export function useChannel(id: string, token: string | unknown) {
  const { data, error, isLoading } = useSuspenseQuery({
    queryKey: ["channel", id],
    queryFn: () => getChannel(id, token),
  });
  return {
    data,
    error,
    isLoading,
  };
}

async function patchChannel(channel: Channel, token: string | unknown) {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + `/channels/${channel.id}`;

  const data = new FormData();
  data.append("name", channel.name);
  data.append("description", channel.description);
  data.append("type", channel.type);
  if (channel.type === ChannelType.PROTECTED) {
    data.append("password", channel.password || "");
  }
  if (channel.image) {
    data.append("image", channel.image);
  }
  const res = await baseQuery(url, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
    body: data,
  });
  const response = await res.json();
  return response;
}

export function usePatchChannelMutation(token: string | unknown) {
  return useMutation<Channel, RequestError, { channel: Channel }>({
    mutationFn: ({ channel }) => patchChannel(channel, token),
  });
}

export function useChannelForm(
  defaultValues: Channel,
  formType: "create" | "update",
  token: string | unknown,
) {
  const { register, handleSubmit, formState, setValue, getValues } =
    useForm<Channel>({
      resolver: yupResolver(channelSchema),
      defaultValues,
    });

  const createChannelMutation = useCreateChannelMutation(token);
  const editChannelMutation = usePatchChannelMutation(token);

  async function onSubmit(channel: Channel) {
    if (formType === "create") {
      await createChannelMutation.mutateAsync({ channel });
    } else {
      await editChannelMutation.mutateAsync({
        channel: {
          ...channel,
          id: defaultValues.id,
        },
      });
    }
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    formState,
    channel: getValues(),
    setChannel: (key: keyof Channel, value: any) =>
      setValue(key, value, { shouldValidate: true }),
  };
}
