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
import { Select, Skeleton } from "@mantine/core";
import Placeholders from "../Placeholders";

type Props = {};

const TeamsComponent = (props: Props) => {
  const { data: user } = useUserQuery({});
  const [selectedSport, setSelectedSport] = useState<string>(
    localStorage.getItem("selectedSport") || "0"
  );

  const { data: adminSports } = useAdminSportsQuery(
    { club_id: user?.club },
    { skip: !user?.club }
  );

  const [teams, setTeams] = useState<Teams>();
  const { data: superTeams, isLoading: superTeamsLoading } = useSuperTeamsQuery(
    {},
    { skip: user?.user_type !== "Supervisor" }
  );
  const { data: adminTeams, isLoading: adminTeamsLoading } = useAdminTeamsQuery(
    { club_id: user?.club, sport_id: +selectedSport },
    { skip: user?.user_type !== "Admin" || !user?.club }
  );

  useEffect(() => {
    if (superTeams) setTeams(superTeams);
    if (adminTeams) setTeams(adminTeams);
  }, [superTeams, adminTeams]);

  useEffect(() => {
    if (adminSports && !localStorage.getItem("selectedSport")) {
      setSelectedSport(JSON.stringify(adminSports.results[0].id));
    }
  }, [adminSports]);

  useEffect(() => {
    localStorage.setItem("selectedSport", selectedSport);
  }, [selectedSport]);

  const [superDeleteTeam] = useSuperDeleteTeamMutation();
  const [adminDeleteTeam] = useAdminDeleteTeamMutation();

  return (
    <div className="admin-teams pt-4">
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
      {superTeamsLoading ||
        (adminTeamsLoading && (
          <div className="flex flex-wrap gap-4 p-4">
            <Skeleton width={250} height={350} radius="lg" />
            <Skeleton width={250} height={350} radius="lg" />
            <Skeleton width={250} height={350} radius="lg" />
            <Skeleton width={250} height={350} radius="lg" />
            <Skeleton width={250} height={350} radius="lg" />
            <Skeleton width={250} height={350} radius="lg" />
            <Skeleton width={250} height={350} radius="lg" />
            <Skeleton width={250} height={350} radius="lg" />
          </div>
        ))}
      <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 m-4">
        {teams?.results.map((team) => {
          return (
            <div className="relative hover:shadow-md transition-all delay-100 ease-linear">
              <Link
                to={`teams/${team.id}`}
                key={team.id}
                className="inline-block h-full w-full"
              >
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
        {user?.user_type === "Admin" && selectedSport === "0" ? (
          <Placeholders
            img="/assets/images/novideo.png"
            preText={"Please select"}
            pageName={"Sport"}
            postText={"To Get it's teams"}
          />
        ) : (
          <AddTeamCardForm sport_id={selectedSport} />
        )}
      </div>
    </div>
  );
};

export default TeamsComponent;
