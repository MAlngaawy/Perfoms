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

type Props = {};

const TeamInfo = (props: Props) => {
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);

  const { data: coahcTeamPlayers } = useGetTeamPlayersQuery(
    { team_id: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam }
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
                    selectedPlayerTeam.id !== undefined
                      ? JSON.stringify(selectedPlayerTeam.id)
                      : "1"
                  }
                />
              </div>
            </Grid.Col>
            <Grid.Col span={12} xs={4} sm={3}>
              <UpcomingEventsCard />
            </Grid.Col>
            <Grid.Col
              className="bg-white p-4 rounded-3xl flex gap-4 justify-start items-center flex-wrap"
              span={12}
            >
              {coahcTeamPlayers?.results.map((player, idx) => {
                return (
                  <div
                    key={idx}
                    className="shadow-xl cursor-pointer transform hover:scale-105 rounded-lg w-28 text-center bg-white flex flex-col justify-center items-center"
                    // onClick={() => navigate(`/players`)}
                    onClick={() => navigate(`/players/${player.id}`)}
                  >
                    <Avatar
                      className="rounded-lg w-full h-28 object-cover"
                      src={player.icon}
                      alt="player Image"
                    />
                    <h2 className="text-sm">{player.name}</h2>
                  </div>
                );
              })}
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
