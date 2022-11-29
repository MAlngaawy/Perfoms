import { Grid } from "@mantine/core";
import Card from "~/@main/components/Card";
import { PlayerData } from "~/app/store/types/user-types";
import CustomCalendar from "../../../@main/components/Calendar";
import AddPlayer from "./molecules/AddPlayer";
import { useSelector } from "react-redux";
import { selectedPlayerFn } from "~/app/store/parent/parentSlice";
import { Link } from "react-router-dom";
import { Player } from "~/app/store/types/parent-types";
import TimeFilter from "~/@main/components/TimeFilter";
import TeamFilter from "~/@main/components/TeamFilter";
import { usePlayerCalenderQuery } from "~/app/store/parent/parentApi";
import UpcomingEventsCard from "~/@main/components/UpcomingEventsCard";
import HomeLoading from "./organisms/HomeLoading";
import HomePlayerInfoCard from "../../../@main/components/HomePlayerInfoCard";
import HomeTeamInfoCard from "../../../@main/components/HomeTeamInfoCard";
import { selectedPlayerTeamFn } from "../../store/parent/parentSlice";
import PerformanceSummaryCard from "~/@main/components/PerformanceSummaryCard";

export type Players = {
  name: string;
  icon_url: string;
};
const HomePage = () => {
  const selectedPlayer: Player = useSelector(selectedPlayerFn);
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);
  const { data: playerAttendance } = usePlayerCalenderQuery(
    { id: selectedPlayer?.id },
    { skip: !selectedPlayer?.id }
  );

  // const { data: playerSportTeam } = usePlayerSportTeamsQuery(
  //   { player_id: selectedPlayer?.id, team_id: selectedPlayerTeam?.id },
  //   { skip: !selectedPlayer?.id || !selectedPlayerTeam?.id }
  // );

  // const { data: upcomingEvents } = useUpcomingEventsQuery(
  //   { team_id: selectedPlayerTeam?.id },
  //   { skip: !selectedPlayerTeam?.id }
  // );
  return (
    <div className="home-page px-5 mb-20">
      <div className="my-4 flex xs:flex-row gap-2 justify-between items-center">
        <div className="flex gap-3 items-center">
          <AddPlayer />
        </div>
        <div className="flex gap-1 justify-center items-center md:pt-0">
          <TeamFilter />
          <TimeFilter />
        </div>
      </div>
      {selectedPlayer && selectedPlayerTeam ? (
        <>
          <Grid columns={12} gutter={"sm"}>
            <Grid.Col sm={3} span={12}>
              <HomePlayerInfoCard />
            </Grid.Col>
            <Grid.Col sm={9} span={12}>
              <Link to="/Reports">
                <PerformanceSummaryCard />
              </Link>
            </Grid.Col>
          </Grid>
          <Grid columns={12} gutter={"sm"}>
            <Grid.Col sm={4} span={12}>
              <HomeTeamInfoCard />
            </Grid.Col>
            <Grid.Col sm={5} span={12}>
              {playerAttendance && (
                <CustomCalendar
                  data={playerAttendance.results.map((item) => ({
                    day: item.day,
                    attendance: item.status,
                  }))}
                />
              )}
            </Grid.Col>
            <Grid.Col sm={3} span={12}>
              <UpcomingEventsCard />
            </Grid.Col>
          </Grid>
        </>
      ) : (
        <>
          <HomeLoading />
          {/* <div className="flex justify-center items-center">
            <div className="card bg-white rounded-xl flex flex-col gap-6 text-center p-8">
              <Avatar
                size={"xl"}
                className="mx-auto"
                src="/assets/images/noplayer.png"
                alt="icon"
              />
              <h2 className="text-4xl text-perfBlue">Welcome on board</h2>
              <p className=" text-lg font-bold text-gray-300">
                Its about time to make a great player.
              </p>
              <div className="flex justify-center items-center">
                <AddPlayer />
              </div>
            </div>
          </div> */}
        </>
      )}
    </div>
  );
};

export default HomePage;
