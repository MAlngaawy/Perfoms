import { Avatar } from "@mantine/core";
import React, { useContext } from "react";
import AppIcons from "~/@main/core/AppIcons";
import {
  useDeleteCourseMutation,
  useDeleteLeagueMutation,
  useGetPlayerCoursesQuery,
  usePlayerLeagueQuery,
} from "~/app/store/user/userApi";
import { useParams } from "react-router-dom";
import DeleteButton from "~/@main/components/ManagerComponents/SubComponents/DeleteButton";
import { EditModeContext } from "../../../../PlayerDetails";
import AppUtils from "~/@main/utils/AppUtils";
import AddLeagueForm from "./Forms/AddLeagueForm";
import AddPlayerCourse from "./Forms/AddPlayerCourse";
import { Player } from "~/app/store/types/parent-types";
import { useSelector } from "react-redux";
import { selectedPlayerFn } from "~/app/store/parent/parentSlice";

type Props = {};

const Experiences = (props: Props) => {
  const editMode = useContext(EditModeContext);

  const { id: player_id } = useParams();
  const selectedPlayer: Player = useSelector(selectedPlayerFn);
  const id = player_id || JSON.stringify(selectedPlayer.id);
  const { data: playerLeagues } = usePlayerLeagueQuery(
    { player_id: id },
    { skip: !id }
  );
  const { data: playerCourses } = useGetPlayerCoursesQuery(
    { player_id: id },
    { skip: !id }
  );
  const [deleteCourse] = useDeleteCourseMutation();

  return (
    <div className="bg-white rounded-3xl p-6 min-h-full">
      <div className="title flex items-center gap-2">
        <Avatar src={"/assets/images/Leagues.png"} />
        <div className="flex items-center justify-between w-full">
          <h3 className="text-base font-medium text-perfLightBlack">
            Tournaments
          </h3>
          {editMode && <AddLeagueForm />}
        </div>
      </div>
      <div className="leagues flex flex-wrap gap-4 my-6">
        {playerLeagues?.results.map((league) => {
          return (
            <OneLeague
              from={league.start_date}
              to={league.end_date}
              id={JSON.stringify(league.id)}
              name={league.title}
              location={league.location}
            />
          );
        })}
      </div>
      <div className="courses">
        <div className="flex items-center justify-between w-full mb-2">
          <TitleWithIcon name="Camps" />
          {editMode && <AddPlayerCourse />}
        </div>
        {playerCourses?.results.length === 0 && (
          <h2 className="my-4">
            No <span className="text-perfBlue"> Camps </span> Added Yet!
          </h2>
        )}
        <ul className="list-disc list-outside  ml-6">
          {playerCourses?.results.map((course) => (
            <li
              key={course.id}
              className="text-md w-full relative font-normal text-perfGray3 my-4 pr-5 break-words"
            >
              {editMode && (
                <div className="absolute right-0">
                  <DeleteButton
                    name={course.name}
                    type="Camps"
                    deleteFun={() => {
                      deleteCourse({ id: course.id })
                        .then(() => {
                          AppUtils.showNotificationFun(
                            "Success",
                            "Done",
                            "Successfully Deleted Camps"
                          );
                        })
                        .catch(() => {
                          AppUtils.showNotificationFun(
                            "Error",
                            "Sorry",
                            "Can't Delete Camps Now"
                          );
                        });
                    }}
                  />
                </div>
              )}
              {course.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// from and to

type oneLeagueTypes = {
  from: string;
  to: string;
  name: string;
  id: string;
  location: string;
};
const OneLeague = ({ from, to, name, id, location }: oneLeagueTypes) => {
  const editMode = useContext(EditModeContext);
  const [deleteLeague] = useDeleteLeagueMutation();
  const { refetch } = usePlayerLeagueQuery({ player_id: id }, { skip: !id });

  return (
    <div className="flex items-center gap-4">
      <div className="date">
        <h2 className="text-sm">{name}</h2>
        <span className="text-xs flex flex-col text-perfGray3">
          {from} / {to}
        </span>
        <h3 className="text-xs text-perfGray3">{location}</h3>
      </div>
      {editMode && (
        <DeleteButton
          deleteFun={() => {
            deleteLeague({ id: +id })
              .then(() => {
                AppUtils.showNotificationFun(
                  "Success",
                  "Done",
                  "Successfully Deleted tournament"
                );
                refetch();
              })
              .catch(() => {
                AppUtils.showNotificationFun(
                  "Error",
                  "Sorry",
                  "Can't add tournament now"
                );
              });
          }}
          name={name}
          type="tournament"
        />
      )}
    </div>
  );
};

const TitleWithIcon = ({ name }: { name: string }) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="icon bg-perfBlue p-1 rounded-full">
        <AppIcons className="w-5 h-5 text-white" icon="BriefcaseIcon:solid" />
        {/* <AppIcons icon="Briefcase:solid" /> */}
      </div>
      <div className="title">
        <h2>{name}</h2>
      </div>
    </div>
  );
};

export default Experiences;
