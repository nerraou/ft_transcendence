"use client";

import LabelInputText from "@molecules/chat/LabelinputText";
import LabelInputPassword from "@molecules/chat/LabelInputPassword";
import LabelImage from "@molecules/chat/LabelImage";

import Layout from "@templates/Layout";
import { useState } from "react";
import LabelSelectButtonGroup from "@components/molecules/chat/LabelSelectButtonGroup";
import LabelInputTextArea from "@components/molecules/chat/LabelInputTextArea";
import Button from "@components/atoms/Button";

function CreateChannel() {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [value, setValue] = useState("");

  function changePasswordVisibility() {
    if (isPasswordVisible == false) {
      setPasswordVisibility(true);
    } else {
      setPasswordVisibility(false);
    }
  }

  return (
    <Layout>
      <div className="flex flex-col justify-center py-16  px-8 sm:px-2 ">
        <div className="bg-light-bg-secondary border-4 rounded-xl p-12 sm:p-2">
          <div className="bg-light-bg-primary dark:bg-light-bg-tertiary border-4 rounded-xl p-10 xl:px-5 lg:px-5 sm:px-2">
            <h1 className="text-light-fg-primary text-xxl  sm:text-xl md:text-xl">
              Create Channel
            </h1>
            <div className="mt-10 sm:space-y-5 space-y-8">
              <LabelImage
                image="/anime.jpg"
                labelValue="Channel Image"
                jwt=""
              />

              <LabelInputText
                labelValue="Channel Name"
                placeholder="Name"
                borderColor="border-light-fg-primary"
                onChange={() => {
                  return;
                }}
              />

              <LabelSelectButtonGroup
                labelValue="Channel Type"
                onChange={(newValue) => {
                  setValue(newValue);
                  return newValue;
                }}
                value={value}
              />

              <LabelInputPassword
                labelValue="Channel Password"
                placeholder="**********"
                borderColor="border-light-fg-primary"
                isDisabled={value != "protected"}
                onPasswordVisibilityChange={changePasswordVisibility}
                isPasswordVisible={isPasswordVisible}
                onChange={() => {
                  return;
                }}
              />

              <LabelInputTextArea
                labelValue="Channel Description"
                placeholder="TYpe something"
                borderColor="border-light-fg-primary"
                onChange={() => {
                  return;
                }}
              />
              <div className="flex justify-end">
                <Button text="Create" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateChannel;
