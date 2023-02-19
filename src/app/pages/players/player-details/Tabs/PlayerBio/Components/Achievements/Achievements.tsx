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
      <div className="flex justify-between">
        <h3 className="text-base font-medium text-perfLightBlack">
          Achievements
        </h3>
        {editMode && <AddAchievement />}
      </div>

      <div className="flex flex-col gap-5">
        {playerAchievements?.results.map((ach) => {
          return (
            <OneAchievement
              type={ach.type}
              date={ach.year}
              place={ach.place}
              key={ach.id}
              id={ach.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;

const OneAchievement = ({ type, date, place, id }: any) => {
  const editMode = useContext(EditModeContext);
  const [deleteAchievements] = useDeleteAchievementsMutation();

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-1">
        <div className="icon">
          <img src="/assets/images/medal.png" className="w-10" alt="medal" />
        </div>
        <div className="details break-words">
          <h2 className="type text-xs font-medium text-perfLightBlack">
            {type}
          </h2>
          <p className="text-xs text-perfGray3">
            {date}, {place}
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
