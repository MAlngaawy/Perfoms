import { Avatar, Grid } from "@mantine/core";
import React from "react";
import CustomCalendar from "~/@main/components/Calendar";
import Card from "~/@main/components/Card";
import { useNavigate } from "react-router-dom";
import UpcomingEventsCard from "~/@main/components/UpcomingEventsCard";
import { useSelector } from "react-redux";
import { selectedPlayerTeamFn } from "~/app/store/parent/parentSlice";
import { useGetTeamPlayersQuery } from "~/app/store/coach/coachApi";
import HomeTeamInfoCard from "~/@main/components/HomeTeamInfoCard";
import NoTeamComp from "~/@main/components/NoTeamComp";
import TeamCalendar from "../../SubPages/SingleTeam/Components/TeamCalendar";
import { useUserQuery } from "~/app/store/user/userApi";
import AddPlayer from "../../SubPages/SingleTeam/Components/AddPLayerToTeam";
import { SinglePlayer } from "../../SubPages/SingleTeam/Components/TeamPlayers";

type Props = {};

const TeamInfo = (props: Props) => {
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);
  const { data: user } = useUserQuery({});

  const { data: coachTeamPlayers } = useGetTeamPlayersQuery(
    { team_id: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam || user?.user_type !== "Coach" }
  );

  const navigate = useNavigate();

  return (
    <>
      {selectedPlayerTeam ? (
        <div className="m-4">
          <Grid gutter={"sm"}>
            <Grid.Col span={12} sm={5}>
              <HomeTeamInfoCard />
            </Grid.Col>
            <Grid.Col span={12} xs={8} sm={4}>
              <div className="bg-white p-4 rounded-3xl min-h-full">
                <TeamCalendar
                  teamId={
                    selectedPlayerTeam?.id !== undefined
                      ? JSON.stringify(selectedPlayerTeam?.id)
                      : "1"
                  }
                />
              </div>
            </Grid.Col>
            <Grid.Col span={12} xs={4} sm={3}>
              <UpcomingEventsCard />
            </Grid.Col>
            <Grid.Col
              className={`bg-white p-2 rounded-3xl ${
                !coachTeamPlayers ? "justify-center" : "flex-start"
              } items-center flex-wrap`}
              span={12}
            >
              <h2 className="m-4">Team Players</h2>
              <div className="flex gap-4 flex-wrap mt-6 justify-center sm:justify-start">
                {coachTeamPlayers &&
                  coachTeamPlayers?.results.map((player, idx) => {
                    return (
                      // <div
                      //   key={idx}
                      //   className="shadow-xl cursor-pointer transform hover:scale-105 rounded-lg w-28 text-center bg-white flex flex-col justify-center items-center"
                      //   onClick={() => navigate(`/players/${player.id}`)}
                      // >
                      //   <Avatar
                      //     className="rounded-lg w-full h-28 object-cover"
                      //     src={player.icon}
                      //     alt="player Image"
                      //   />
                      //   <h2 className="text-sm">{player.name}</h2>
                      // </div>
                      <SinglePlayer
                        key={player.id}
                        teamId={selectedPlayerTeam?.id}
                        id={player.id}
                        name={player.name}
                        image={player.icon}
                      />
                    );
                  })}
                <AddPlayer
                  teamPlayers={coachTeamPlayers}
                  coach_team_id={selectedPlayerTeam?.id}
                />
              </div>

              <>
                {!coachTeamPlayers?.results.length && (
                  <div className="flex flex-col md:flex-row justify-center items-center gap-3">
                    <img
                      className="md:w-72 md:my-5"
                      src="/assets/images/noteams.png"
                      alt="no teams"
                    />
                    <p>This team has no players yet</p>
                  </div>
                )}
              </>
            </Grid.Col>
          </Grid>
        </div>
      ) : (
        <NoTeamComp />
      )}
    </>
  );
};

export default TeamInfo;
