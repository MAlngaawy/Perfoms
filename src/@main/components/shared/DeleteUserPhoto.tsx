import { Group, Modal } from "@mantine/core";
import React, { ReactNode, useState } from "react";
import useWindowSize from "~/@main/hooks/useWindowSize";
import { axiosInstance } from "~/app/configs/dataService";
import {
  useUpdateProfileMutation,
  useUserQuery,
} from "~/app/store/user/userApi";

type Props = {
  children: ReactNode;
};

const DeleteUserPhoto = ({ children }: Props) => {
  const [updateProfile] = useUpdateProfileMutation();
  const { data: user, refetch } = useUserQuery({});
  const [opened, setOpened] = useState(false);
  const screen = useWindowSize();

  const deleteUserImage = () => {
    console.log("onSubmitFn CLICKED");

    const formData = new FormData();
    formData.append("avatar", "");

    axiosInstance
      .patch("user-generals/update-profile/", formData)
      .then(() => refetch());
  };

  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        sx={{
          ".mantine-Modal-modal": {
            width: screen.width < 400 ? 300 : 450,
          },
        }}
        title="Confirm!"
      >
        <div className="flex flex-col gap-6 m-2 xs:m-10">
          <h2 className="text-perfSecondary text-center">
            Are You Sure You Want To Delete your photo?
          </h2>
          <div className="flex justify-between gap-2 xs:justify-center items-center mt-4">
            <button
              onClick={() => {
                setOpened(false);
              }}
              className="bg-transparent border border-perfBlue text-perfBlue mx-auto w-32  rounded-lg py-2 px-4"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                deleteUserImage();
                setOpened(false);
              }}
              className="bg-perfSecondary mx-auto w-32 text-white rounded-lg py-2 px-4"
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>

      <Group position="center">
        <div
          className="transform hover:scale-105 text-sm cursor-pointer"
          onClick={() => setOpened(true)}
        >
          {children}
        </div>
      </Group>
    </div>
  );
};

export default DeleteUserPhoto;
