import { Group, Modal } from "@mantine/core";
import React, { ReactNode, useState } from "react";
import useWindowSize from "~/@main/hooks/useWindowSize";
import AppUtils from "~/@main/utils/AppUtils";
import { axiosInstance } from "~/app/configs/dataService";
import { useAdminPlayerInfoQuery } from "~/app/store/clubManager/clubManagerApi";
import {
  useMyPlayersQuery,
  useOnePlayerQuery,
} from "~/app/store/parent/parentApi";
import { CoachPlayerInfo } from "~/app/store/types/coach-types";
import { useUserQuery } from "~/app/store/user/userApi";

type Props = {
  children: ReactNode;
  player: CoachPlayerInfo;
  refetchFun: any;
};

const DeletePlayerPhoto = ({ children, player, refetchFun }: Props) => {
  const { data: user } = useUserQuery({});
  const { refetch: refetchTopBarPlayer } = useMyPlayersQuery({});
  const { refetch: refetchPlayerData } = useOnePlayerQuery(
    { id: player.id },
    { skip: !player?.id || user?.user_type !== "Parent" }
  );
  const [opened, setOpened] = useState(false);
  const screen = useWindowSize();

  const deleteUserImage = () => {
    console.log("onSubmitFn CLICKED");

    const formData = new FormData();
    formData.append("icon", "");

    const REQUEST_URL =
      user?.user_type === "Parent"
        ? `parent/update-player/${player.id}/`
        : `club-manager/update-player/${player.id}/`;

    try {
      axiosInstance
        .patch(REQUEST_URL, formData)
        .then((res) => {
          if (user?.user_type === "Parent") {
            refetchPlayerData();
            refetchTopBarPlayer();
          } else {
            refetchFun();
          }
          AppUtils.showNotificationFun(
            "Success",
            "Done",
            "Player Photo deleted Successfully"
          );
        })
        .catch((err) => {
          AppUtils.showNotificationFun("Error", "Sorry", "Tra again later");
        });
    } catch (err) {}
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
            Are You Sure You Want To Delete Player photo?
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

export default DeletePlayerPhoto;
