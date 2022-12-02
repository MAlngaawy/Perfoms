import { Grid } from "@mantine/core";
import { useSelector } from "react-redux";
import { useTeamCoachesQuery } from "~/app/store/parent/parentApi";
import { selectedPlayerTeamFn } from "~/app/store/parent/parentSlice";
import CoachCard from "./components/CoachCard";
import TeamFilter from "../../../@main/components/TeamFilter";
import CoachesLoading from "./components/CoachesLoading";

type Props = {
  coaches?: object[];
};

const CoachesPage = ({ coaches }: Props) => {
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);
  const { data: playerCoaches, isLoading } = useTeamCoachesQuery(
    { teamId: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam }
  );
  return (
    <div className="coaches p-2">
      <div className="flex justify-end my-2">
        <TeamFilter />
      </div>
      {isLoading ? (
        <CoachesLoading />
      ) : (
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
      )}
    </div>
  );
};

export default CoachesPage;
