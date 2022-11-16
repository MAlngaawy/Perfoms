import { useState } from "react";
import { Modal, Group } from "@mantine/core";
import AppIcons from "./../../../../../@main/core/AppIcons";

type Props = {
  name: string;
  id: number;
  type: string;
};

const DeleteButton = ({ id, name, type }: Props) => {
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Confirm!">
        <div className="flex flex-col gap-6 m-2 xs:m-10">
          <h2 className="text-perfSecondary font-bold ">
            Are You Sure You Want To Delete {type} ({name}) ?
          </h2>
          <button
            onClick={() => {
              console.log({
                name: name,
                id: id,
              });
              setOpened(false);
            }}
            className="bg-perfSecondary text-white rounded-lg p-4"
          >
            Yes, Confirm
          </button>
        </div>
      </Modal>

      <Group position="center">
        <button
          className="transform hover:scale-125"
          onClick={() => setOpened(true)}
        >
          <AppIcons
            className="w-5 h-5 text-perfGray3 hover:text-perfSecondary"
            icon="TrashIcon:outline"
          />
        </button>
      </Group>
    </div>
  );
};

export default DeleteButton;
