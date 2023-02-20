import { useEffect, useState } from "react";
import TeamCard from "./SubComponents/TeamCard";
import AddTeamCardForm from "./SubComponents/AddTeamCardForm";
import {
  useSuperDeleteTeamMutation,
  useSuperTeamsQuery,
} from "~/app/store/supervisor/supervisorMainApi";
import {
  useAdminDeleteTeamMutation,
  useAdminTeamsQuery,
} from "~/app/store/clubManager/clubManagerApi";
import { Teams } from "~/app/store/types/clubManager-types";
import { useUserQuery } from "~/app/store/user/userApi";
import { Link } from "react-router-dom";
import AppUtils from "~/@main/utils/AppUtils";
import DeleteButton from "./SubComponents/DeleteButton";
import EditButton from "./SubComponents/EditTeamButton";

type Props = {};

const TeamsComponent = (props: Props) => {
  const [teams, setTeams] = useState<Teams>();
  const { data: user } = useUserQuery({});
  const { data: superTeams } = useSuperTeamsQuery(
    {},
    { skip: user?.user_type !== "Supervisor" }
  );
  const { data: adminTeams } = useAdminTeamsQuery(
    { club_id: user?.club },
    { skip: user?.user_type !== "Admin" || !user?.club }
  );

  useEffect(() => {
    if (superTeams) setTeams(superTeams);
    if (adminTeams) setTeams(adminTeams);
  }, [superTeams, adminTeams]);

  const [superDeleteTeam] = useSuperDeleteTeamMutation();
  const [adminDeleteTeam] = useAdminDeleteTeamMutation();

  return (
    <div className="admin-teams flex flex-col xs:flex-row flex-wrap items-stretch gap-6 p-2 sm:p-6">
      {teams?.results.map((team) => {
        return (
          <div className="relative">
            <Link to={`teams/${team.id}`} key={team.id} className="relative">
              <TeamCard team={team} />
            </Link>
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
      })}
      <AddTeamCardForm />
    </div>
  );
};

export default TeamsComponent;
