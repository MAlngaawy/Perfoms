import { Grid } from "@mantine/core";
import TeamCalendar from "./Components/TeamCalendar";
import TeamCoaches from "./Components/TeamCoaches";
import TeamInfoCard from "./Components/TeamInfoCard";
import TeamPlayers from "./Components/TeamPlayers";
import TeamUpcomingEvents from "./Components/TeamUpcomingEvents";
import { useUserQuery } from "~/app/store/user/userApi";
import { useParams } from "react-router-dom";
import CustomBreadCrumbs from "~/@main/components/BreadCrumbs";
import SharedBreadCrumbs from "~/@main/components/shared/SharedBreadCrumbs";

type Props = {};

const SingleTeam = (props: Props) => {
  const { data: user } = useUserQuery(null);
  const { team_id } = useParams();

  return (
    <div className="p-2">
      {/* <CustomBreadCrumbs
        items={[
          {
            href: user?.user_type === "Admin" ? "/admin" : "/supervisor",
            title: "Home",
          },
        ]}
      /> */}
      <SharedBreadCrumbs />

      <Grid gutter={"xs"} className="items-stretch">
        <Grid.Col span={12} sm={7} lg={4}>
          <CardDiv>
            <TeamCalendar teamId={team_id !== undefined ? team_id : ""} />
          </CardDiv>
        </Grid.Col>
        <Grid.Col span={12} sm={5} lg={3}>
          <CardDiv>
            <TeamCoaches teamId={team_id !== undefined ? team_id : ""} />
          </CardDiv>
        </Grid.Col>
        <Grid.Col span={12} sm={7} lg={3}>
          <CardDiv>
            <TeamUpcomingEvents teamId={team_id !== undefined ? team_id : ""} />
          </CardDiv>
        </Grid.Col>
        <Grid.Col span={12} sm={5} lg={2}>
          <CardDiv>
            <TeamInfoCard teamId={team_id !== undefined ? team_id : ""} />
          </CardDiv>
        </Grid.Col>
        <Grid.Col span={12}>
          <CardDiv>
            <TeamPlayers teamId={team_id !== undefined ? team_id : ""} />
          </CardDiv>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default SingleTeam;

const CardDiv = ({ children }: any) => {
  return <div className="bg-white p-4 rounded-3xl min-h-full">{children}</div>;
};
