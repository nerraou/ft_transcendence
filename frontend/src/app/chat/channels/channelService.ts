import { Channel, ChannelType } from "@components/atoms/chat/ChannelForm";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import baseQuery, { RequestError } from "@utils/baseQuery";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";

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
  image: yup
    .mixed<File>()
    .when("id", ([id], schema) => {
      if (id) {
        return schema.notRequired();
      }
      return schema.required("Image is required");
    })
    .test("fileSize", "The file is too large", (value) => {
      if (!value) {
        return true;
      }
      return value.size <= 2000000;
    }),
  name: yup
    .string()
    .required("Name is required")
    .max(255, "Name must be at most 255 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be at most 500 characters"),
  type: yup.mixed<ChannelType>().required(),
  password: yup.string().when("type", ([type], schema) => {
    if (type === ChannelType.PROTECTED) {
      return schema
        .required("Password is required for protected channels")
        .min(4, "Password must be at least 4 characters")
        .max(16, "Password must be at most 16 characters");
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
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + `/channels`;

  const data = new FormData();
  data.append("name", channel.name);
  data.append("description", channel.description);
  data.append("type", channel.type);
  data.append("channelId", channel?.id?.toString() || "");
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState,
    setValue,
    getValues,
    trigger,
    watch,
    reset,
  } = useForm<Channel>({
    resolver: yupResolver(channelSchema),
    defaultValues,
  });

  const channelType = watch("type");
  const image = watch("image");

  useEffect(() => {
    trigger("image");
  }, [image, trigger]);

  useEffect(() => {
    trigger("password");
  }, [channelType, trigger]);

  const createChannelMutation = useCreateChannelMutation(token);
  const editChannelMutation = usePatchChannelMutation(token);

  async function onSubmit(channel: Channel) {
    if (formType === "create") {
      try {
        await createChannelMutation.mutateAsync({ channel });
        reset();
        setIsModalOpen(true);
      } catch (e) {
        throw e;
      }
    } else {
      try {
        await editChannelMutation.mutateAsync({
          channel,
        });
        setIsModalOpen(true);
      } catch (e) {
        throw e;
      }
    }
  }

  return {
    isLoading: createChannelMutation.isPending || editChannelMutation.isPending,
    isModalOpen,
    setIsModalOpen,
    register,
    handleSubmit: handleSubmit(onSubmit),
    formState,
    channel: getValues(),
    setChannel: (key: keyof Channel, value: any) =>
      setValue(key, value, { shouldValidate: true }),
  };
}
