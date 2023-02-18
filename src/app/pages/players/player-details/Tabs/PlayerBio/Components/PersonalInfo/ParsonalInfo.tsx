import { Avatar, Progress } from "@mantine/core";
import AppIcons from "~/@main/core/AppIcons";
import {
  useDeleteUserEducationMutation,
  usePlayerEducationQuery,
} from "~/app/store/user/userApi";
import AddEducation from "./Forms/AddEducation";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import DeleteButton from "~/@main/components/ManagerComponents/SubComponents/DeleteButton";
import { EditModeContext } from "../../../../PlayerDetails";
import AppUtils from "~/@main/utils/AppUtils";

type Props = {};

const ParsonalInfo = (props: Props) => {
  const { id } = useParams();
  const editMode = useContext(EditModeContext);
  const [deleteEducation] = useDeleteUserEducationMutation();
  const { data: player_educations, refetch: refetchEducation } =
    usePlayerEducationQuery({ player_id: id }, { skip: !id });

  return (
    <div className="bg-white rounded-3xl p-4 min-h-full">
      <div className="my-4 sm:my-8 flex flex-col justify-center items-center">
        <Avatar
          src={
            "https://media.istockphoto.com/id/519767679/photo/hes-one-super-confident-kid.jpg?s=612x612&w=0&k=20&c=2v10ji99BuL19yK8ak-Rd2ZZK0nU9mQA7bk8QefIb3E="
          }
          className="border border-perfBlue"
          sx={{
            ".mantine-Avatar-placeholder": {
              border: "2px solid #2F80ED",
            },
            ".mantine-Avatar-image": {
              border: "2px solid #2F80ED",
              borderRadius: "100%",
            },
          }}
          radius={100}
          size={100}
        />
        <h2 className="my-2 font-medium text-perfGray1 text-lg">Player Name</h2>
        <div className="levels text-xs text-perfGray3">
          <span>Epert Level 22</span> |{" "}
          <span>
            760/1,900 xp{" "}
            <AppIcons
              icon="ExclamationCircleIcon:outline"
              className="w-5 h-5 inline"
            />
          </span>
        </div>
        <div className="w-40 my-2">
          <Progress
            radius="xl"
            size="xl"
            value={40}
            sx={{
              ".mantine-Progress-bar": {
                background:
                  "linear-gradient(180deg, #2F80ED 12.5%, #1865CD 133.31%)",
              },
            }}
          />
        </div>
      </div>

      <div className="data flex flex-col gap-2">
        <div className="title flex flex-col justify-start items-start">
          <h3 className="text-base font-medium text-perfLightBlack">Title</h3>
          <p className="font-normal text-sm text-perfGray3">Taekwondo</p>
        </div>
        <div className="profile flex flex-col justify-start items-start">
          <h3 className="text-base font-medium text-perfLightBlack">Profile</h3>
          <p className="font-normal text-sm text-perfGray3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            commodi odit placeat dicta! Iure, velit dolore esse nulla veritatis
            blanditiisLorem ipsum dolor sit amet consectetur adipisicing elit.
            Facilis commodi odit placeat dicta! Iure, velit dolore esse nulla
            veritatis blanditiis.
          </p>
        </div>
        <div className="education text-left">
          <div className="flex justify-between">
            <h3 className="text-base font-medium text-perfLightBlack">
              Education
            </h3>
            {editMode && <AddEducation />}
          </div>
          {player_educations?.results.map((education) => {
            return (
              <div className="my-2 relative">
                <p className="date text-xs font-normal text-perfGray3">
                  {education.year}
                </p>
                <h2>{education.degree}</h2>
                <p className="date text-xs font-normal text-perfGray3">
                  {education.universty}
                </p>
                <div className="absolute right-0 top-0">
                  {editMode && (
                    <DeleteButton
                      deleteFun={() => {
                        deleteEducation({ id: education.id })
                          .then(() => {
                            AppUtils.showNotificationFun(
                              "Success",
                              "Done",
                              "Successfully Deleted Education"
                            );
                            refetchEducation();
                          })
                          .catch(() => {
                            AppUtils.showNotificationFun(
                              "Error",
                              "Sorry",
                              "Can't add Education now"
                            );
                          });
                      }}
                      name={education.degree}
                      type="Degree"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="skills">
          <h3 className="text-base font-medium text-perfLightBlack">Skills</h3>
          <ul className="flex flex-col gap-2">
            <li className=" text-sm text-perfGray3">Communication skills</li>
            <li className=" text-sm text-perfGray3">Team Player</li>
            <li className=" text-sm text-perfGray3">Commitment </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ParsonalInfo;
