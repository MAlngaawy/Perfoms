import { useState } from "react";
import { Modal, Group } from "@mantine/core";
import AppIcons from "../../../core/AppIcons";
import { showNotification } from "@mantine/notifications";
import useWindowSize from "~/@main/hooks/useWindowSize";

type Props = {
  name: string | undefined;
  type: string;
  deleteFun: any;
};

const DeleteButton = ({ name, type, deleteFun }: Props) => {
  const [opened, setOpened] = useState(false);
  const screen = useWindowSize();

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
            Are You Sure You Want To Delete {type} {name} ?
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
                deleteFun();
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
        <button
          className="transform hover:scale-125"
          onClick={() => setOpened(true)}
        >
          <AppIcons
            className="w-4 h-4 text-perfGray3 hover:text-perfSecondary"
            icon="TrashIcon:outline"
          />
        </button>
      </Group>
    </div>
  );
};

export default DeleteButton;
