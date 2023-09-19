import { Grid } from "@mantine/core";
import TeamCalendar from "./Components/TeamCalendar";
import TeamCoaches from "./Components/TeamCoaches";
import TeamInfoCard from "./Components/TeamInfoCard";
import TeamPlayers from "./Components/TeamPlayers";
import TeamUpcomingEvents from "./Components/TeamUpcomingEvents";
import { useUserQuery } from "~/app/store/user/userApi";
import { useParams } from "react-router-dom";
import SharedBreadCrumbs from "~/@main/components/shared/SharedBreadCrumbs";
import { useEffect, useState } from "react";
import { useSuperTeamInfoQuery } from "~/app/store/supervisor/supervisorMainApi";
import { useAdminTeamInfoQuery } from "~/app/store/clubManager/clubManagerApi";
import { SuperVisorTeamInfo } from "~/app/store/types/supervisor-types";
import { useCoachTeamInfoQuery } from "~/app/store/coach/coachApi";
import { CoachTeamInfo } from "~/app/store/types/coach-types";

type Props = {};

const SingleTeam = (props: Props) => {
  const { data: user } = useUserQuery(null);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const { team_id } = useParams();
  const [teamInfo, setTeamInfo] =
    useState<SuperVisorTeamInfo | CoachTeamInfo>();
  const { data: superTeam } = useSuperTeamInfoQuery(
    { team_id },
    { skip: !team_id }
  );
  const { data: adminTeam } = useAdminTeamInfoQuery(
    { team_id },
    { skip: !team_id }
  );
  const { data: coachTeamInfo } = useCoachTeamInfoQuery(
    { team_id },
    { skip: !team_id }
  );
  useEffect(() => {
    if (superTeam) setTeamInfo(superTeam);
    if (adminTeam) setTeamInfo(adminTeam);
    if (coachTeamInfo) setTeamInfo(coachTeamInfo);
  }, [superTeam, adminTeam, coachTeamInfo]);

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
          {/* {teamInfo && teamInfo?.attend_per === "DAY" ? (
            <CardDiv>
              <TeamCalendar teamId={team_id !== undefined ? team_id : ""} />
            </CardDiv>
          ) : (
            <CardDiv>
              <TeamSessionAttCalendar
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
              />
            </CardDiv>
          )} */}
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
