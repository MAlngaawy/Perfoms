import { useContext } from "react";
import { useParams } from "react-router-dom";
import {
  useDeleteAchievementsMutation,
  useGetPlayerAchievementsQuery,
} from "~/app/store/user/userApi";
import { EditModeContext } from "../../../../PlayerDetails";
import AddAchievement from "./Forms/AddAchievement";
import { Grid } from "@mantine/core";
import OneAchievement from "~/@main/components/shared/OneAchievement";

type Props = {};

const Achievements = (props: Props) => {
  const editMode = useContext(EditModeContext);
  const { id } = useParams();
  const { data: playerAchievements } = useGetPlayerAchievementsQuery(
    { player_id: id },
    { skip: !id }
  );
  const [deleteAchievements] = useDeleteAchievementsMutation();

  return (
    <div className="bg-white rounded-3xl p-6 px-3 min-h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-medium text-perfLightBlack">
          Achievements
        </h3>
        {editMode && <AddAchievement />}
      </div>

      <Grid>
        {playerAchievements?.results.map((ach) => {
          return (
            <Grid.Col span={12} xs={6}>
              <OneAchievement
                type={ach.type}
                date={ach.date}
                location={ach.location}
                place={ach.place}
                key={ach.id}
                id={ach.id}
                editMode={editMode}
                deleteAchFunction={deleteAchievements}
              />
            </Grid.Col>
          );
        })}
      </Grid>
    </div>
  );
};

export default Achievements;
