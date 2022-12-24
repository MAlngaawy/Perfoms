import { useState } from "react";
import { Modal, Group } from "@mantine/core";
import AppIcons from "../../../../../@main/core/AppIcons";

type Props = {
  name: string;
  id: number;
  type: string;
  deleteFun: any;
};

const DeletePlayerFromTeam = ({ id, name, type, deleteFun }: Props) => {
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Confirm!">
        <div className="flex flex-col gap-6 m-2 xs:m-10">
          <h2 className="text-perfSecondary text-center">
            Are You Sure You Want To Delete {type} ({name}) ?
          </h2>
          <div className="flex justify-around items-center mt-4">
            <button
              onClick={() => {
                setOpened(false);
              }}
              className="bg-transparent border border-perfBlue text-perfBlue mx-auto w-fit  rounded-lg py-2 px-4"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                deleteFun();
                setOpened(false);
              }}
              className="bg-perfSecondary mx-auto w-fit text-white rounded-lg py-2 px-4"
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>

      <Group position="center">
        <div
          onClick={() => setOpened(true)}
          className="hidden group-hover:flex text-white absolute top-0 right-0 rounded-lg cursor-pointer hover:bg-perfGray1/90 p-2"
        >
          <AppIcons className="w-5 h-5 text-white" icon="TrashIcon:outline" />
        </div>
      </Group>
    </div>
  );
};

export default DeletePlayerFromTeam;
