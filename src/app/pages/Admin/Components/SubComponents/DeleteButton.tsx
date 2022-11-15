import { useState } from "react";
import { Modal, Group } from "@mantine/core";
import AppIcons from "./../../../../../@main/core/AppIcons";

type Props = {
  teamName: string;
  teamId: number;
};

const DeleteButton = ({ teamId, teamName }: Props) => {
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
      >
        <h2 className="text-perfSecondary font-bold m-10">
          Are You Sure You Want To Delete {teamName} Team ?
        </h2>
      </Modal>

      <Group position="center">
        <button
          className="transform hover:scale-150"
          onClick={() => setOpened(true)}
        >
          <AppIcons
            className="w-5 h-5 text-perfGray3"
            icon="TrashIcon:outline"
          />
        </button>
      </Group>
    </div>
  );
};

export default DeleteButton;
