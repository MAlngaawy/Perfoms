import { Grid, Loader } from "@mantine/core";
import UpcomingEventsCard from "~/@main/components/UpcomingEventsCard";
import { useSelector } from "react-redux";
import { selectedPlayerTeamFn } from "~/app/store/parent/parentSlice";
import { useGetTeamPlayersQuery } from "~/app/store/coach/coachApi";
import HomeTeamInfoCard from "~/@main/components/HomeTeamInfoCard";
import NoTeamComp from "~/@main/components/NoTeamComp";
import TeamCalendar from "../../SubPages/SingleTeam/Components/TeamCalendar";
import {
  useGeneralSportsQuery,
  useGetFilteredPlayersQuery,
  useGetTeamInfoQuery,
  useUserQuery,
} from "~/app/store/user/userApi";
import AddPlayer from "../../SubPages/SingleTeam/Components/AddPLayerToTeam";
import { SinglePlayer } from "../../SubPages/SingleTeam/Components/TeamPlayers";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { TeamPlayer } from "~/app/store/types/clubManager-types";

type Props = {};

const TeamInfo = (props: Props) => {
  const { ref, inView } = useInView();
  const [nextPage, setNextPage] = useState<number>(2);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalData, setTotalData] = useState<TeamPlayer[]>([]);
  const [stillHavePages, setStillHavePages] = useState<boolean>(false);

  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);
  const { data: user } = useUserQuery({});
  const [sportId, setSportId] = useState(0);

  const { data: coachTeamPlayers } = useGetTeamPlayersQuery(
    { team_id: selectedPlayerTeam?.id, page: currentPage },
    { skip: !selectedPlayerTeam || user?.user_type !== "Coach" }
  );

  useEffect(() => {
    if (coachTeamPlayers) {
      if (currentPage === 1) {
        setTotalData(coachTeamPlayers?.results);
      } else {
        setTotalData([...totalData, ...coachTeamPlayers?.results]);
      }
      if (
        coachTeamPlayers?.pages_count &&
        coachTeamPlayers?.pages_count >= nextPage
      ) {
        setStillHavePages(true);
      } else {
        setStillHavePages(false);
      }
    }
  }, [coachTeamPlayers]);

  const resetAllData = () => {
    // setTotalData([]);
    setCurrentPage(1);
    setNextPage(2);
  };

  useEffect(() => {
    if (inView) {
      if (
        coachTeamPlayers?.pages_count &&
        coachTeamPlayers?.pages_count >= nextPage
      ) {
        setCurrentPage(nextPage);
        setNextPage(nextPage + 1);
      } else {
        return;
      }
    }
  }, [inView]);

  const { data: teamInfo } = useGetTeamInfoQuery({
    team_id: selectedPlayerTeam?.id,
  });

  const { data: sports } = useGeneralSportsQuery({});

  useEffect(() => {
    if (teamInfo) {
      if (sports) {
        const currentTeamSportId: number = sports?.results.filter(
          (sport) => sport.name === teamInfo?.sport?.name
        )[0].id;
        setSportId(currentTeamSportId);
        console.log("currentTeamSportId", currentTeamSportId);
      }
    }
  }, [teamInfo, sports]);

  const { data: filteredPlayers, refetch: refetchFilteredPlayers } =
    useGetFilteredPlayersQuery({
      team_id: selectedPlayerTeam?.id,
      sport_id: sportId,
    });

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
                  teamInfo={teamInfo}
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
              <h2 className="p-2 text-center text-lg">Team Players</h2>
              <div className="flex flex-wrap justify-center gap-2 xs:gap-4  mt-4">
                {totalData.map((player, idx) => {
                  return (
                    <SinglePlayer
                      resetAllData={resetAllData}
                      key={player.id}
                      teamId={selectedPlayerTeam?.id}
                      id={player.id}
                      name={player.name}
                      image={player.icon}
                    />
                  );
                })}
                <AddPlayer
                  resetAllData={resetAllData}
                  filteredPlayers={filteredPlayers}
                  refetchFilteredPlayers={refetchFilteredPlayers}
                  teamInfo={teamInfo}
                  coach_team_id={selectedPlayerTeam?.id}
                />
              </div>

              {stillHavePages && (
                <div
                  className="bg-perfBlue mx-auto my-4 rounded-2xl flex gap-2 w-fit py-2 items-center justify-center px-6 text-white text-sm"
                  ref={ref}
                >
                  <span>Loading Players</span>{" "}
                  <Loader color="white" size="md" variant="dots" />
                </div>
              )}

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
