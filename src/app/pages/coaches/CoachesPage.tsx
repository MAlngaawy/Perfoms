import { useEffect } from "react";
import { Grid } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import {
  usePlayerTeamsQuery,
  useTeamCoachesQuery,
} from "~/app/store/parent/parentApi";
import {
  selectedPlayerFn,
  selectedPlayerTeamFn,
  selectPlayerTeam,
} from "~/app/store/parent/parentSlice";
import CoachCard from "./components/CoachCard";
import TeamFilter from "../../../@main/components/TeamFilter";
import CoachesLoading from "./components/CoachesLoading";
import NoPlayersComp from "../../../@main/components/NoPlayersComp";

type Props = {};

const CoachesPage = (props: Props) => {
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);
  const {
    data: playerCoaches,
    isLoading,
    isSuccess,
  } = useTeamCoachesQuery(
    { teamId: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam }
  );
  const dispatch = useDispatch();
  const selectedPlayer = useSelector(selectedPlayerFn);
  let { data: playerTeams } = usePlayerTeamsQuery(
    { id: selectedPlayer?.id },
    { skip: !selectedPlayer }
  );

  useEffect(() => {
    console.log("selectedPlayer", selectedPlayer);

    if (playerTeams)
      dispatch(
        selectPlayerTeam(
          localStorage.getItem("SelectedPlayerTeam")
            ? JSON.parse(localStorage.getItem("SelectedPlayerTeam") || "")
            : {
                id: playerTeams.results[0].id,
                name: playerTeams.results[0].name,
              }
        )
      );
  }, [playerTeams]);

  if (selectedPlayer) {
    if (isSuccess)
      return (
        <div className="coaches p-2">
          <div className="flex justify-end my-2">
            <TeamFilter />
          </div>
          {!playerCoaches?.results.length && <NoPlayersComp />}
          <Grid gutter={10}>
            {playerCoaches?.results.map((coach) => {
              return (
                <Grid.Col xs={6} sm={4} md={3}>
                  <CoachCard
                    key={coach.id}
                    id={coach.id}
                    role={"Coach"}
                    name={`${coach.first_name} ${coach.last_name}`}
                    education={coach.details?.education || "NA"}
                    teams={coach.teams}
                    photo={coach.avatar}
                    sport={coach.job}
                  />
                </Grid.Col>
              );
            })}
          </Grid>
        </div>
      );

    return (
      <div className="m-10">
        <CoachesLoading />
      </div>
    );
  } else {
    return <NoPlayersComp />;
  }
};

export default CoachesPage;
