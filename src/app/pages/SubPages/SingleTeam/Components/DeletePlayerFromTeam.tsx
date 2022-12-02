import { useState } from "react";
import { Modal, Group } from "@mantine/core";
import AppIcons from "../../../../../@main/core/AppIcons";

type Props = {
  name: string;
  id: number;
  type: string;
};

const DeletePlayerFromTeam = ({ id, name, type }: Props) => {
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
                console.log({
                  name: name,
                  id: id,
                });
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
          className="hidden group-hover:flex justify-center items-center text-white gap-2 cursor-pointer hover:bg-perfGray1/90 p-2 w-full"
        >
          <AppIcons className="w-5 h-5 text-white" icon="TrashIcon:outline" />
          <span className="text-white">Delete </span>
        </div>
      </Group>
    </div>
  );
};

export default DeletePlayerFromTeam;