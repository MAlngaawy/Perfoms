import {
  useDeleteSkillMutation,
  useDeleteUserEducationMutation,
  useGetPlayerInfoQuery,
  usePlayerEducationQuery,
  usePlayerSkillsQuery,
  useUserQuery,
} from "~/app/store/user/userApi";
import AddEducation from "./Forms/AddEducation";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import DeleteButton from "~/@main/components/ManagerComponents/SubComponents/DeleteButton";
import { EditModeContext } from "../../../../PlayerDetails";
import AppUtils from "~/@main/utils/AppUtils";
import AddSkill from "./Forms/AddSkill";
import Info from "~/@main/components/Info";
import AvatarWithBlueBorder from "~/@main/components/shared/AvatarWithBlueBorder";
import EditPlayer from "~/app/pages/home/molecules/EditPlayer";
import { selectedPlayerFn } from "~/app/store/parent/parentSlice";
import { useSelector } from "react-redux";
import { Player } from "~/app/store/types/parent-types";

type Props = {};

const ParsonalInfo = (props: Props) => {
  const { id: player_id } = useParams();
  const { data: user } = useUserQuery({});
  const editMode = useContext(EditModeContext);
  const selectedPlayer: Player = useSelector(selectedPlayerFn);
  const id = player_id || JSON.stringify(selectedPlayer?.id);
  const [deleteEducation] = useDeleteUserEducationMutation();
  const [deleteSkill] = useDeleteSkillMutation();
  const { data: playerEducations, refetch: refetchEducation } =
    usePlayerEducationQuery({ player_id: id }, { skip: !id });
  const { data: playerSkills, refetch: refetchPlayerSkills } =
    usePlayerSkillsQuery({ player_id: id }, { skip: !id });
  const { data: playerData, refetch: refetchPlayerData } =
    useGetPlayerInfoQuery({ player_id: id }, { skip: !id });

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-3xl p-4">
        {
          //@ts-ignore
          editMode && ["Parent", "Admin"].includes(user?.user_type) && (
            <EditPlayer
              player={playerData}
              refetchPlayerData={refetchPlayerData}
            />
          )
        }
        <AvatarWithBlueBorder
          name={playerData?.name || "No Name"}
          image={playerData?.icon || "No Image"}
        />
        <div className="h2 font-medium">INFO</div>
        <div className="data flex flex-wrap jus gap-4 mt-2">
          <Info label="Age" value={AppUtils.calculateAge(playerData?.dob)} />
          <Info
            label="Gender"
            value={playerData?.gender === "M" ? "Male" : "Female"}
          />
          {playerData?.sport.toLocaleLowerCase() === "taekwondo" ? (
            <>
              {playerData?.height && (
                <Info label="Height" value={playerData?.height} />
              )}
              {playerData?.world_weight && (
                <Info label="World Weight" value={playerData?.world_weight} />
              )}
              {playerData?.olympic_weight && (
                <Info
                  label="Olympic Weight"
                  value={playerData?.olympic_weight}
                />
              )}
              {playerData?.front_leg !== "NONE" && (
                <Info
                  label="Preferred Front Leg"
                  value={playerData?.front_leg}
                />
              )}
            </>
          ) : (
            <>
              {playerData?.weight && (
                <Info label="Weight" value={playerData?.weight} />
              )}
              {playerData?.height && (
                <Info label="Height" value={playerData?.height} />
              )}
            </>
          )}
          <Info label="Phone" value={playerData?.phone || "N/A"} />
          <div className="flex flex-col items-center justify-center">
            <h3 className=" text-perfGray3 text-xs">Teams</h3>
            <div className="flex gap-2">
              {playerData &&
                playerData?.team?.map((team) => (
                  <h2 className="text-perfGray1 text-sm font-normal">
                    {team.name}
                  </h2>
                ))}
            </div>
          </div>
          <Info label="Sport" value={playerData?.sport} />
        </div>
      </div>

      <div className="bg-white rounded-3xl p-4 flex flex-col gap-4">
        {/* <div className="profile flex flex-col justify-start items-start">
          <h3 className="text-base font-medium text-perfLightBlack">Profile</h3>
          <p className="font-normal text-sm text-perfGray3">
            {playerData?.profile || "N/A"}
          </p>
        </div> */}
        <div className="education text-left">
          <div className="flex justify-between">
            <h3 className="text-base font-medium text-perfLightBlack">
              Education
            </h3>
            {editMode && <AddEducation />}
          </div>
          {playerEducations && playerEducations?.results.length === 0 && (
            <h2 className="m-2 text-sm font-medium">
              No <span className=" text-perfBlue"> Education </span> added yet
            </h2>
          )}
          {playerEducations?.results.map((education) => {
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
          <div className="flex justify-between">
            <h3 className="text-base font-medium text-perfLightBlack">
              Skills
            </h3>
            {editMode && <AddSkill />}
          </div>
          {playerSkills && playerSkills?.results.length === 0 && (
            <h2 className="m-2 text-sm font-medium">
              No <span className=" text-perfBlue"> Skills </span> added yet
            </h2>
          )}
          <ul className="flex flex-col gap-2">
            {playerSkills?.results.map((skill) => {
              return (
                <li key={skill.id} className=" text-sm relative text-perfGray3">
                  {editMode && (
                    <div className="absolute right-0">
                      <DeleteButton
                        name={skill.name}
                        type="Skill"
                        deleteFun={() => {
                          deleteSkill({ id: skill.id })
                            .then(() => {
                              AppUtils.showNotificationFun(
                                "Success",
                                "Done",
                                "Successfully Deleted Skill"
                              );
                              refetchPlayerSkills();
                            })
                            .catch(() => {
                              AppUtils.showNotificationFun(
                                "Error",
                                "Sorry",
                                "Can't Delete Skill Now"
                              );
                              refetchPlayerSkills();
                            });
                        }}
                      />
                    </div>
                  )}
                  {skill.name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ParsonalInfo;

{
  /* <div className="levels text-xs text-perfGray3">
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
        </div> */
}
