import React, { useState } from "react";
import { Modal, Group } from "@mantine/core";
import { useAddPlayerAchievementsMutation } from "~/app/store/user/userApi";
import AppIcons from "~/@main/core/AppIcons";
import AddAchievementForm from "~/@main/components/shared/AddAchievementForm";
import { useParams } from "react-router-dom";

type Props = {};

const AddAchievement = (props: Props) => {
  const [opened, setOpened] = useState(false);
  const [addAchievements] = useAddPlayerAchievementsMutation();

  return (
    <>
      <Modal
        title={`Add Achievements`}
        opened={opened}
        onClose={() => {
          setOpened(false);
        }}
      >
        <AddAchievementForm
          setOpened={setOpened}
          addAchievementsFun={addAchievements}
        />
      </Modal>

      <Group position="center">
        <button onClick={() => setOpened(true)} className="">
          <AppIcons
            icon="PlusCircleIcon:outline"
            className="text-perfGray3 w-8 h-8 transform hover:scale-105 duration-100 "
          />
        </button>
      </Group>
    </>
  );
};

export default AddAchievement;
