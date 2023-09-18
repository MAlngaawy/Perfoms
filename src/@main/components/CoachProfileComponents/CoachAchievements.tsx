import { useState, ReactNode, useEffect } from "react";
import { Modal, Group, Input, Select } from "@mantine/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Details } from "~/app/store/types/parent-types";
import {
  useAddUserAchievementsMutation,
  useDeleteAchievementsMutation,
  useGetCoachAchievementsQuery,
  useGetUserAchievementsQuery,
  useUserQuery,
} from "~/app/store/user/userApi";
import { UserAchievements } from "~/app/store/types/user-types";
import { useParams } from "react-router-dom";
import AppUtils from "~/@main/utils/AppUtils";
import { DatePicker } from "@mantine/dates";
import OneAchievement from "~/@main/components/shared/OneAchievement";
import AddAchievementForm from "../shared/AddAchievementForm";

type Props = {
  data: Details | undefined;
  editMode?: boolean;
};

const CoachAchievements = ({ data, editMode }: Props) => {
  const { coach_id } = useParams();
  const { data: user } = useUserQuery({});
  const [achievements, setAchievements] = useState<UserAchievements>();
  const { data: userAchievements } = useGetUserAchievementsQuery({});
  const [deleteAchievements] = useDeleteAchievementsMutation();
  const { data: coachAchievements } = useGetCoachAchievementsQuery(
    { coach_id: coach_id },
    { skip: !coach_id }
  );

  useEffect(() => {
    if (user && ["Parent", "Player"].includes(user?.user_type)) {
      setAchievements(coachAchievements);
    } else {
      setAchievements(userAchievements);
    }
  }, [userAchievements, coachAchievements]);

  return (
    <div className="bg-white flex flex-col gap-4 h-full rounded-lg md:rounded-2xl p-4 pt-10">
      <div className="title">
        <h2 className="text-lg text-perfLightBlack font-medium mb-6">
          Achievements
        </h2>
        {achievements?.results.length === 0 && (
          <h2 className="my-4">
            No <span className="text-perfBlue"> Achievements </span> Added Yet!
          </h2>
        )}
      </div>
      <div className="prize flex flex-col xs:flex-row md:flex-col gap-4 justify-center items-center">
        {achievements?.results.map((item) => {
          return (
            <OneAchievement
              type={item.type}
              date={item.date}
              place={item.place}
              id={item.id}
              location={item.location}
              editMode={editMode}
              deleteAchFunction={deleteAchievements}
            />
          );
        })}
      </div>
      {editMode && <AddButton />}
    </div>
  );
};

export default CoachAchievements;

// Add Achevment Form

function AddButton() {
  const [opened, setOpened] = useState(false);
  const [addAchievements] = useAddUserAchievementsMutation();

  return (
    <>
      <Modal
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

      <Group>
        <button
          onClick={() => {
            setOpened(true);
          }}
          className="text-xs p-2 transform hover:scale-105 duration-100 bg-white border border-perfGray3 rounded-lg text-perfGray3"
        >
          + Add Achievements
        </button>
      </Group>
    </>
  );
}
