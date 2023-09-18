import { Grid } from "@mantine/core";
import TeamCalendar from "./Components/TeamCalendar";
import TeamCoaches from "./Components/TeamCoaches";
import TeamInfoCard from "./Components/TeamInfoCard";
import TeamPlayers from "./Components/TeamPlayers";
import TeamUpcomingEvents from "./Components/TeamUpcomingEvents";
import { useGetTeamInfoQuery, useUserQuery } from "~/app/store/user/userApi";
import { useParams } from "react-router-dom";
import SharedBreadCrumbs from "~/@main/components/shared/SharedBreadCrumbs";
import { useEffect } from "react";

type Props = {};

const SingleTeam = (props: Props) => {
  const { team_id } = useParams();

  const { data: teamInfo } = useGetTeamInfoQuery({ team_id });

  useEffect(() => {
    if (teamInfo) {
      console.log("userteamInfo", teamInfo);
    }
  }, [teamInfo]);

  return (
    <div className="p-2">
      <SharedBreadCrumbs />

      <Grid gutter={"xs"} className="items-stretch">
        <Grid.Col span={12} sm={7} lg={4}>
          <CardDiv>
            <TeamCalendar
              teamInfo={teamInfo}
              teamId={team_id !== undefined ? team_id : ""}
            />
          </CardDiv>
        </Grid.Col>
        <Grid.Col span={12} sm={5} lg={3}>
          <CardDiv>
            <TeamCoaches teamId={team_id !== undefined ? team_id : ""} />
          </CardDiv>
        </Grid.Col>
        <Grid.Col span={12} sm={7} lg={3}>
          <CardDiv>
            <TeamUpcomingEvents />
          </CardDiv>
        </Grid.Col>
        <Grid.Col span={12} sm={5} lg={2}>
          <CardDiv>
            <TeamInfoCard teamId={team_id !== undefined ? team_id : ""} />
          </CardDiv>
        </Grid.Col>
        <Grid.Col span={12}>
          <div className="bg-white p-2 xs:p-4 rounded-3xl min-h-full">
            <TeamPlayers
              teamInfo={teamInfo}
              teamId={team_id !== undefined ? team_id : ""}
            />
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default SingleTeam;

const CardDiv = ({ children }: any) => {
  return <div className="bg-white p-4 rounded-3xl min-h-full">{children}</div>;
};
