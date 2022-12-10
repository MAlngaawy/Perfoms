import { Grid } from "@mantine/core";

import CoachPersonalInfo from "~/@main/components/CoachPersonalInfo";
import CoachExperince from "~/@main/components/CoachExperince";
import CoachAchievements from "~/@main/components/CoachAchievements";
import { useState } from "react";
import {
  useUpdateProfileMutation,
  useUserQuery,
} from "~/app/store/user/userApi";
import AppIcons from "~/@main/core/AppIcons";
import DeleteButton from "~/@main/components/ManagerComponents/SubComponents/DeleteButton";
import { showNotification } from "@mantine/notifications";

type Props = {};

const embtyDetails = {
  bio: "",
  experinces: {
    from: "",
    to: "",
    description: "",
    name: "",
  },
  achievements: [
    {
      place: "",
      type: "",
      year: "",
    },
  ],
  education: {
    degree: "",
    from: "",
    to: "",
    universty: "",
  },
};

const CoachProfilePage = (props: Props) => {
  const [editMode, setEditMode] = useState(false);
  const { data: user, refetch } = useUserQuery(null);

  const [updateProfile] = useUpdateProfileMutation();

  return (
    <div className="mx-2">
      <div className="edit w-full px-20 flex justify-end items-center mt-2">
        {editMode ? (
          <button
            className="bg-perfBlue  border rounded-lg text-white py-1 px-6 cursor-pointer transform hover:scale-105"
            onClick={() => setEditMode(false)}
          >
            Save
          </button>
        ) : (
          <button
            className="bg-transparent rounded-lg border-perfBlue border text-perfBlue py-1 px-6 cursor-pointer transform hover:scale-105"
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
        )}
        {/* {editMode && (
          <DeleteButton
            name="Delete All CV Data"
            type="coach"
            deleteFun={() => {
              updateProfile({
                details: embtyDetails,
              }).then(() => {
                showNotification({
                  message: "All Data Deleted",
                  title: "Done",
                  color: "green",
                });
              });
            }}
          />
        )} */}
      </div>
      <Grid className="p-4" gutter="sm">
        <Grid.Col xs={12} md={3}>
          <CoachPersonalInfo
            editMode={editMode}
            refetch={refetch}
            data={user}
            type={"profile"}
          />
        </Grid.Col>
        <Grid.Col xs={12} md={7}>
          <CoachExperince editMode={editMode} data={user} />
        </Grid.Col>
        <Grid.Col xs={12} md={2}>
          <CoachAchievements editMode={editMode} data={user?.details} />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default CoachProfilePage;
