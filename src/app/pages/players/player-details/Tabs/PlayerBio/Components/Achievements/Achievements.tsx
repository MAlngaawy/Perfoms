import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import DeleteButton from "~/@main/components/ManagerComponents/SubComponents/DeleteButton";
import AppUtils from "~/@main/utils/AppUtils";
import {
  useDeleteAchievementsMutation,
  useGetPlayerAchievementsQuery,
} from "~/app/store/user/userApi";
import { EditModeContext } from "../../../../PlayerDetails";
import AddAchievement from "./Forms/AddAchievement";
import { Avatar, Grid } from "@mantine/core";

type Props = {};

const Achievements = (props: Props) => {
  const editMode = useContext(EditModeContext);
  const { id } = useParams();
  const { data: playerAchievements } = useGetPlayerAchievementsQuery(
    { player_id: id },
    { skip: !id }
  );
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
              />
            </Grid.Col>
          );
        })}
      </Grid>
    </div>
  );
};

export default Achievements;

const OneAchievement = ({ type, date, place, id, location }: any) => {
  const editMode = useContext(EditModeContext);
  const [deleteAchievements] = useDeleteAchievementsMutation();

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-1">
        <div className="icon">
          <Avatar src="/assets/images/medal.png" size={30} alt="medal" />
        </div>
        <div className="details break-words">
          <h2 className="type text-sm font-medium text-perfLightBlack">
            {type}
          </h2>
          <p className="text-xs text-perfGray3">
            {date}, {location}
          </p>
        </div>
      </div>
      {editMode && (
        <div className="">
          <DeleteButton
            type=" Medal"
            name={place + " " + type}
            deleteFun={() => {
              deleteAchievements({ id: id })
                .then((res) => {
                  AppUtils.showNotificationFun(
                    "Success",
                    "Done",
                    "Successfully Deleted Achievement"
                  );
                })
                .catch((err) => {
                  AppUtils.showNotificationFun(
                    "Error",
                    "Sorry",
                    "Can't Add Achievement Now"
                  );
                });
            }}
          />
        </div>
      )}
    </div>
  );
};
