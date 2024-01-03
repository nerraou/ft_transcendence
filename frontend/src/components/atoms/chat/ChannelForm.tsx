"use client";

import LabelInputText from "@molecules/chat/LabelinputText";
import LabelInputPassword from "@molecules/chat/LabelInputPassword";
import LabelImage from "@molecules/chat/LabelImage";

import { useState } from "react";
import LabelSelectButtonGroup from "@components/molecules/chat/LabelSelectButtonGroup";
import LabelInputTextArea from "@components/molecules/chat/LabelInputTextArea";
import Button from "@components/atoms/Button";
import { useChannelForm } from "@app/chat/channels/channelService";
import Modal from "../Modal";

export enum ChannelType {
  PUBLIC = "PUBLIC",
  PROTECTED = "PROTECTED",
  PRIVATE = "PRIVATE",
}

export interface Channel {
  id?: number;
  name: string;
  description: string;
  imagePath?: string;
  type: ChannelType;
  password?: string;
  image?: File;
}

interface ChannelFormProps {
  title: string;
  token: string | unknown;
  defaultChannel: Channel;
  formType: "create" | "update";
}

function ChannelForm({
  title,
  defaultChannel,
  token,
  formType,
}: ChannelFormProps) {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const imageUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/assets/images/";
  function changePasswordVisibility() {
    if (isPasswordVisible == false) {
      setPasswordVisibility(true);
    } else {
      setPasswordVisibility(false);
    }
  }

  const {
    channel,
    setChannel,
    formState,
    handleSubmit,
    isLoading,
    isModalOpen,
    setIsModalOpen,
  } = useChannelForm(defaultChannel, formType, token);

  return (
    <div className="flex flex-col justify-center py-16  px-8 sm:px-2 ">
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          title="Success"
          description={
            formType == "create"
              ? "Channel Created Successfully"
              : "Channel Updated Successfully"
          }
          action={
            <Button
              text="Ok"
              onClick={() => {
                setIsModalOpen(false);
              }}
            />
          }
        />
      )}
      <div className="bg-light-bg-secondary border-4 rounded-xl p-12 sm:p-2">
        <div className="bg-light-bg-primary dark:bg-light-bg-tertiary border-4 rounded-xl p-10 xl:px-5 lg:px-5 sm:px-2">
          <h1 className="text-light-fg-primary text-xxl  sm:text-xl md:text-xl">
            {title}
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mt-10 sm:space-y-5 space-y-8">
              <LabelImage
                setImage={(image) => {
                  setChannel("image", image);
                }}
                image={channel?.image || undefined}
                originalImage={
                  channel?.imagePath ? imageUrl + channel.imagePath : ""
                }
                labelValue="Channel Image"
                name="image"
                errors={formState.errors}
              />

              <LabelInputText
                value={channel?.name}
                labelValue="Channel Name"
                placeholder="Name"
                borderColor="border-light-fg-primary"
                errors={formState.errors}
                onChange={(e) => {
                  setChannel("name", e.target.value);
                }}
                name="name"
              />

              <LabelSelectButtonGroup
                labelValue="Channel Type"
                onChange={(newValue) => {
                  setChannel("type", newValue);
                }}
                value={channel?.type}
                errors={formState.errors}
                name="type"
              />

              <LabelInputPassword
                labelValue="Channel Password"
                placeholder="**********"
                borderColor="border-light-fg-primary"
                isDisabled={channel.type != ChannelType.PROTECTED}
                onPasswordVisibilityChange={changePasswordVisibility}
                isPasswordVisible={isPasswordVisible}
                onChange={(e) => {
                  setChannel("password", e.target.value);
                }}
                value={channel?.password}
                errors={formState.errors}
                name="password"
              />

              <LabelInputTextArea
                labelValue="Channel Description"
                placeholder="Description"
                borderColor="border-light-fg-primary"
                value={channel?.description}
                onChange={(e) => {
                  setChannel("description", e.target.value);
                }}
                errors={formState.errors}
                name="description"
              />
              <div className="flex justify-end">
                <Button text="Save" loading={isLoading} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChannelForm;
