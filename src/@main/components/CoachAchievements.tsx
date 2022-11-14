import React, { useState } from "react";
import { Modal, Group } from "@mantine/core";

type Props = {
  data: {
    type: string;
    year: number;
    place: string;
  }[];
  editMode?: boolean;
};

const CoachAchievements = ({ data, editMode }: Props) => {
  return (
    <div className="bg-white flex flex-col gap-4 h-full rounded-lg md:rounded-2xl p-4 pt-10">
      <div className="title">
        <h2 className="text-xl text-perfLightBlack font-medium mb-6">
          Achievements
        </h2>
      </div>
      <div className="prize flex flex-col xs:flex-row md:flex-col gap-4 justify-center items-center">
        {data.map((item) => (
          <div className="flex gap-2 justify-center items-center">
            <div className="icon">
              <img
                src="/assets/images/medal.png"
                className="w-10"
                alt="medal"
              />
            </div>
            <div className="details">
              <h2 className="type font-medium text-perfLightBlack">
                {item.type}
              </h2>
              <p className="text-xs text-perfGray3">
                {item.year}, {item.place}{" "}
              </p>
            </div>
          </div>
        ))}
        {editMode && <AddButton />}
      </div>
    </div>
  );
};

export default CoachAchievements;

// Add Achevment Form

function AddButton() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
      >
        <h1>This is Modal Content</h1>
      </Modal>

      <Group position="center">
        <button
          onClick={() => setOpened(true)}
          className="text-sm xl:text-base p-2 transform hover:scale-105 duration-100 bg-white border border-perfGray3 rounded-lg text-perfGray3"
        >
          + Add achievements
        </button>
      </Group>
    </>
  );
}
