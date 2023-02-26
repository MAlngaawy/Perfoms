import { Grid } from "@mantine/core";

import CoachPersonalInfo from "~/@main/components/CoachProfileComponents/CoachPersonalInfo";
import CoachExperince from "~/@main/components/CoachProfileComponents/CoachExperince";
import CoachAchievements from "~/@main/components/CoachProfileComponents/CoachAchievements";
import { useState } from "react";
import {
  useUpdateProfileMutation,
  useUserQuery,
} from "~/app/store/user/userApi";

type Props = {};

const CoachProfilePage = (props: Props) => {
  const [editMode, setEditMode] = useState(false);
  const { data: user, refetch } = useUserQuery(null);

  const [updateProfile] = useUpdateProfileMutation();

  return (
    <div className="mx-2">
      <div className="edit w-full flex px-4 justify-end items-center mt-4">
        {editMode ? (
          <button
            className="bg-perfBlue  border rounded-lg text-white py-1 px-6 cursor-pointer transform hover:scale-105"
            onClick={() => setEditMode(false)}
          >
            Done
          </button>
        ) : (
          <button
            className="bg-transparent rounded-lg border-perfBlue border text-perfBlue py-1 px-6 cursor-pointer transform hover:scale-105"
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
        )}
      </div>
      <Grid className="p-4" gutter="sm">
        <Grid.Col xs={12} md={3}>
          <CoachPersonalInfo editMode={editMode} type={"profile"} />
        </Grid.Col>
        <Grid.Col xs={12} md={6}>
          <CoachExperince editMode={editMode} data={user} />
        </Grid.Col>
        <Grid.Col xs={12} md={3}>
          <CoachAchievements editMode={editMode} data={user?.details} />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default CoachProfilePage;
