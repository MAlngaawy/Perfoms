import { useState } from "react";
import { Modal, Button, Group } from "@mantine/core";
import AppIcons from "./../../../../../@main/core/AppIcons";

type Props = {};

const AddTeamCardForm = (props: Props) => {
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Introduce yourself!"
        >
          {/* Modal content */}
        </Modal>

        <Group position="center" className="h-full">
          <div
            onClick={() => setOpened(true)}
            className="team-card h-full transition-all delay-75 ease-in-out cursor-pointer transform hover:scale-105 relative w-full xs:w-72 bg-slate-300 p-8 rounded-xl flex flex-col justify-center items-center gap-4"
          >
            <AppIcons
              className="text-perfGray2 w-16 h-16"
              icon="PlusIcon:outline"
            />
            <span className="text-perfGray2 text-xl">Add Team</span>
          </div>
        </Group>
      </>
    </div>
  );
};

export default AddTeamCardForm;
