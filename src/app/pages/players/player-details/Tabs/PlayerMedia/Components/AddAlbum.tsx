import { Group, Modal } from "@mantine/core";
import { useState } from "react";
import AppIcons from "~/@main/core/AppIcons";

type Props = {};

const AddAlbum = (props: Props) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        Hello In My Modal
      </Modal>

      <Group position="left">
        <button
          className="text-4xl font-bold bg-gray-300 text-perfGray3 w-60 h-40 flex justify-center items-center rounded-lg transform transition-all hover:scale-105"
          onClick={() => setOpened(true)}
        >
          <AppIcons icon="PlusIcon:outline" className="w-10 h-10" />
        </button>
      </Group>
    </>
  );
};

export default AddAlbum;
