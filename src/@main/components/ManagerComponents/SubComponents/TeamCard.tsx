import { Link } from "react-router-dom";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditTeamButton";
import { Avatar } from "@mantine/core";
import { useSuperDeleteTeamMutation } from "~/app/store/supervisor/supervisorMainApi";
import { showNotification } from "@mantine/notifications";
import { useAdminDeleteTeamMutation } from "~/app/store/clubManager/clubManagerApi";
import { useUserQuery } from "~/app/store/user/userApi";
import AppUtils from "~/@main/utils/AppUtils";

const TeamCard = ({ team }: any) => {
  const [superDeleteTeam] = useSuperDeleteTeamMutation();
  const [adminDeleteTeam] = useAdminDeleteTeamMutation();
  const { data: user } = useUserQuery({});

  return (
    <div className="team-card relative w-full xs:w-72 bg-white p-8 rounded-xl flex flex-col justify-center items-center gap-4">
      <Link
        to={`teams/${team.id}`}
        className="bg-pagesBg rounded-full w-32 h-32 flex justify-center items-center"
      >
        <Avatar size={"xl"} src={team.icon_url} alt="icon" />
      </Link>

      <h2 className="text-xl font-semibold text-perfGray1">{team.name}</h2>
      <h3 className="text-xl text-perfBlue">{team.sport.name}</h3>

      <div className="flex justify-around items-center w-full">
        <div className="age flex flex-col">
          <span className=" text-sm text-perfGray3">Age</span>
          <span className="text-xl text-perfGray1">
            {team.from_age} - {team.to_age}
          </span>
        </div>
        <div className="players flex flex-col">
          <span className=" text-sm text-perfGray3">Players</span>
          <span className="text-xl text-perfGray1">{team.players_count}</span>
        </div>
      </div>

      {/* Edit and Delete Buttons */}
      <div className="flex absolute right-5 top-5 gap-2">
        <EditButton teamData={team} />
        <DeleteButton
          deleteFun={() => {
            if (team.current_players_count > 0) {
              AppUtils.showNotificationFun(
                "Error",
                "Sorry",
                "You can't delete a team that has players"
              );
              return;
            }
            if (user?.user_type === "Supervisor") {
              superDeleteTeam({
                team_id: team.id,
              })
                .then(() => {
                  AppUtils.showNotificationFun(
                    "Success",
                    "Done",
                    "Team Deleted"
                  );
                })
                .catch(() => {
                  AppUtils.showNotificationFun(
                    "Error",
                    "Wrong",
                    "Something wend wrong, try again later"
                  );
                });
            } else if (user?.user_type === "Admin") {
              adminDeleteTeam({
                team_id: team.id,
              })
                .then(() => {
                  AppUtils.showNotificationFun(
                    "Success",
                    "Done",
                    "Team Deleted"
                  );
                })
                .catch(() => {
                  AppUtils.showNotificationFun(
                    "Error",
                    "Wrong",
                    "Something wend wrong, try again later"
                  );
                });
            }
          }}
          name={team.name}
          type="Team"
        />
      </div>
    </div>
  );
};

export default TeamCard;
