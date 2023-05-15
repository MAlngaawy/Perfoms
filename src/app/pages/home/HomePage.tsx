import { Grid } from "@mantine/core";
import CustomCalendar from "../../../@main/components/Calendar";
import AddPlayer from "./molecules/AddPlayer";
import { useSelector } from "react-redux";
import {
  selectedPlayerFn,
  selectedPlayerTeamFn,
} from "~/app/store/parent/parentSlice";
import { Player } from "~/app/store/types/parent-types";
import TimeFilter from "~/@main/components/TimeFilter";
import TeamFilter from "~/@main/components/TeamFilter";
import { useMyPlayersQuery } from "~/app/store/parent/parentApi";
import UpcomingEventsCard from "~/@main/components/UpcomingEventsCard";
import HomeLoading from "./organisms/HomeLoading";
import HomePlayerInfoCard from "../../../@main/components/HomePlayerInfoCard";
import HomeTeamInfoCard from "../../../@main/components/HomeTeamInfoCard";
import PerformanceSummaryCard from "~/@main/components/PerformanceSummaryCard";
import NoPlayersComp from "~/@main/components/NoPlayersComp";
import { useUserQuery } from "~/app/store/user/userApi";

export type Players = {
  name: string;
  icon_url: string;
};
const HomePage = () => {
  const selectedPlayer: Player = useSelector(selectedPlayerFn);
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);
  const { data: players, isLoading } = useMyPlayersQuery({});
  const { data: user } = useUserQuery({});

  if (isLoading)
    return (
      <div className="m-10">
        <HomeLoading />
      </div>
    );

  if (players?.results?.length === 0) {
    return <NoPlayersComp />;
  } else {
    return (
      <div className="home-page px-5 mb-20">
        <div className="my-4 flex xs:flex-row gap-2 justify-between items-center">
          <div className="flex gap-3 items-center">
            {user?.user_type === "Parent" && <AddPlayer />}
          </div>
          <div className="flex gap-1 justify-center items-center md:pt-0">
            <TeamFilter />
            <TimeFilter />
          </div>
        </div>
        {selectedPlayer && selectedPlayerTeam ? (
          <div className="flex flex-col gap-4">
            <Grid columns={12} gutter={"md"}>
              <Grid.Col sm={3} md={2.5} span={12}>
                <HomePlayerInfoCard />
              </Grid.Col>
              <Grid.Col sm={9} md={9.5} span={12}>
                {/* <Link to="/reports"> */}
                <PerformanceSummaryCard />
                {/* </Link> */}
              </Grid.Col>
            </Grid>
            <Grid columns={12} gutter={"md"}>
              <Grid.Col sm={4} span={12}>
                <HomeTeamInfoCard />
              </Grid.Col>
              <Grid.Col sm={5} span={12}>
                <CustomCalendar />
              </Grid.Col>
              <Grid.Col sm={3} span={12}>
                <UpcomingEventsCard />
              </Grid.Col>
            </Grid>
          </div>
        ) : (
          <HomeLoading />
        )}
      </div>
    );
  }
};

export default HomePage;
