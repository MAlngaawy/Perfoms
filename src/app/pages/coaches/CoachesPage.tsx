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
import Placeholders from "~/@main/components/Placeholders";
import AddPlayer from "../home/molecules/AddPlayer";

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

  console.log("playerCoaches", playerCoaches);
  useEffect(() => {
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

  if (!selectedPlayer) {
    return (
      <div className="m-10">
        <CoachesLoading />
      </div>
    );
    // return (
    //   <div className="flex flex-col items-center">
    //     <Placeholders
    //       img="/assets/images/nocoaches.png"
    //       preText={"You Need to add a"}
    //       pageName={"player"}
    //       postText={"to see his"}
    //     />
    //     <p className="text-perfBlue font-medium mb-3">Coaches & supervisors</p>
    //     <AddPlayer />
    //   </div>
    // );
  }

  if (selectedPlayer) {
    if (isSuccess)
      return (
        <div className="coaches p-2">
          <div className="flex justify-end my-2">
            <TeamFilter />
          </div>
          {!playerCoaches?.results.length && <NoCoachesComp />}
          <Grid gutter={10}>
            {playerCoaches?.results
              .filter((coach) =>
                //@ts-ignore
                ["Coach", "SubCoach", "Supervisor"].includes(coach.user_type)
              )
              .map((coach) => {
                return (
                  <Grid.Col xs={6} sm={4} md={3} key={coach.id}>
                    <CoachCard
                      key={coach.id}
                      id={coach.id}
                      role={coach?.user_type}
                      name={`${coach.first_name} ${coach.last_name}`}
                      education={coach.details?.education?.degree || "NA"}
                      teams={coach.teams}
                      photo={coach.avatar}
                      sport={coach.sport}
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

const NoCoachesComp = () => {
  return (
    <div className="flex justify-center items-center mt-20">
      <div className="bg-white p-4 w-fit rounded-xl text-perfGray3">
        No Coaches In This Team Yet
      </div>
    </div>
  );
};

export default CoachesPage;
