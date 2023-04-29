import { useEffect, useState } from "react";
import TeamCard from "./SubComponents/TeamCard";
import AddTeamCardForm from "./SubComponents/AddTeamCardForm";
import {
  useSuperDeleteTeamMutation,
  useSuperTeamsQuery,
} from "~/app/store/supervisor/supervisorMainApi";
import {
  useAdminDeleteTeamMutation,
  useAdminSportsQuery,
  useAdminTeamsQuery,
} from "~/app/store/clubManager/clubManagerApi";
import { Teams } from "~/app/store/types/clubManager-types";
import { useUserQuery } from "~/app/store/user/userApi";
import { Link } from "react-router-dom";
import AppUtils from "~/@main/utils/AppUtils";
import DeleteButton from "./SubComponents/DeleteButton";
import EditButton from "./SubComponents/EditTeamButton";
import { Select } from "@mantine/core";
import Placeholders from "../Placeholders";

type Props = {};

const TeamsComponent = (props: Props) => {
  const { data: user } = useUserQuery({});
  const [selectedSport, setSelectedSport] = useState<string>("0");

  const { data: adminSports } = useAdminSportsQuery(
    { club_id: user?.club },
    { skip: !user?.club }
  );

  const [teams, setTeams] = useState<Teams>();
  const { data: superTeams } = useSuperTeamsQuery(
    {},
    { skip: user?.user_type !== "Supervisor" }
  );
  const { data: adminTeams } = useAdminTeamsQuery(
    { club_id: user?.club, sport_id: +selectedSport },
    { skip: user?.user_type !== "Admin" || !user?.club }
  );

  useEffect(() => {
    if (superTeams) setTeams(superTeams);
    if (adminTeams) setTeams(adminTeams);
  }, [superTeams, adminTeams]);

  useEffect(() => {
    if (adminSports) {
      setSelectedSport(JSON.stringify(adminSports.results[0].id));
    }
  }, [adminSports]);

  const [superDeleteTeam] = useSuperDeleteTeamMutation();
  const [adminDeleteTeam] = useAdminDeleteTeamMutation();

  return (
    <div className="admin-teams flex flex-col xs:flex-row flex-wrap items-stretch gap-4 pt-4">
      {user?.user_type === "Admin" && (
        <div className=" w-full flex justify-end">
          <Select
            className="w-60 mt-2 mx-10"
            placeholder="Pick Sport"
            value={selectedSport}
            onChange={(v: string) => {
              setSelectedSport(v);
            }}
            data={
              adminSports
                ? adminSports.results.map((sport) => {
                    return {
                      value: JSON.stringify(sport.id),
                      label: sport.name,
                    };
                  })
                : ["No Sports"]
            }
          />
        </div>
      )}
      {teams?.results.map((team) => {
        return (
          <div className="relative">
            <Link to={`teams/${team.id}`} key={team.id} className="relative">
              <TeamCard team={team} />
            </Link>
            <div className="flex absolute right-5 top-5 gap-2">
              <EditButton sport_id={selectedSport} teamData={team} />
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
      {user?.user_type === "Admin" &&
        (selectedSport !== "0" ? (
          <AddTeamCardForm sport_id={selectedSport} />
        ) : (
          <Placeholders
            img="/assets/images/novideo.png"
            preText={"Please select"}
            pageName={"Sport"}
            postText={"To Get it's teams"}
          />
        ))}
    </div>
  );
};

export default TeamsComponent;
