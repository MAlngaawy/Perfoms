import { Avatar } from "@mantine/core";
import React, { useContext } from "react";
import AppIcons from "~/@main/core/AppIcons";
import {
  useAddPlayerLeagueMutation,
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

type Props = {};

const Experiences = (props: Props) => {
  const editMode = useContext(EditModeContext);
  const { id } = useParams();
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
        <div className="flex justify-between w-full">
          <h3 className="text-base font-medium text-perfLightBlack">Leagues</h3>
          {editMode && <AddLeagueForm />}
        </div>
      </div>
      <div className="leagues flex flex-wrap gap-8 justify-center my-6">
        {playerLeagues?.results.map((league) => {
          return (
            <OneLeague
              from={league.start_date}
              to={league.end_date}
              id={JSON.stringify(league.id)}
              name={league.title}
            />
          );
        })}
      </div>
      <div className="courses">
        <div className="flex justify-between w-full">
          <TitleWithIcon name="Courses" />
          {editMode && <AddPlayerCourse />}
        </div>
        {playerCourses?.results.length === 0 && (
          <h2 className="my-4">
            No <span className="text-perfBlue"> Courses </span> Added Yet!
          </h2>
        )}
        <ul className="list-disc list-outside  ml-8">
          {playerCourses?.results.map((course) => (
            <li
              key={course.id}
              className="text-xs w-full relative font-normal text-perfGray3 my-4 pr-5 break-words"
            >
              {editMode && (
                <div className="absolute right-0">
                  <DeleteButton
                    name={course.name}
                    type="Courses"
                    deleteFun={() => {
                      deleteCourse({ id: course.id })
                        .then(() => {
                          AppUtils.showNotificationFun(
                            "Success",
                            "Done",
                            "Successfully Deleted Courses"
                          );
                        })
                        .catch(() => {
                          AppUtils.showNotificationFun(
                            "Error",
                            "Sorry",
                            "Can't Delete Courses Now"
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
};
const OneLeague = ({ from, to, name, id }: oneLeagueTypes) => {
  const editMode = useContext(EditModeContext);
  const [deleteLeague] = useDeleteLeagueMutation();
  const { refetch } = usePlayerLeagueQuery({ player_id: id }, { skip: !id });

  return (
    <div className="flex gap-4">
      <div className="date">
        <span className="text-xs text-perfGray3">
          {from} - {to}
        </span>
        <h2 className="text-md">{name}</h2>
      </div>
      {editMode && (
        <DeleteButton
          deleteFun={() => {
            deleteLeague({ id: +id })
              .then(() => {
                AppUtils.showNotificationFun(
                  "Success",
                  "Done",
                  "Successfully Deleted Education"
                );
                refetch();
              })
              .catch(() => {
                AppUtils.showNotificationFun(
                  "Error",
                  "Sorry",
                  "Can't add Education now"
                );
              });
          }}
          name={name}
          type="Degree"
        />
      )}
    </div>
  );
};

const TitleWithIcon = ({ name }: { name: string }) => {
  return (
    <div className="flex gap-2 items-center mb-6">
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
