import { useEffect, useState } from "react";
import { useCoachTeamPlayersAttendancesStatisticsQuery } from "~/app/store/coach/coachApi";
import AttendReportsChart from "~/@main/components/MainReports/AttendReportsChart";
import { useSuperTeamAttendPlayersStatisticsQuery } from "~/app/store/supervisor/supervisorMainApi";
import { TeamPlayersAttendStatistics } from "~/app/store/types/coach-types";
import { useUserQuery } from "~/app/store/user/userApi";
import { useAdminTeamAttendPlayersStatisticsQuery } from "~/app/store/clubManager/clubManagerApi";
import { useSelector } from "react-redux";
import { timeFilterFn } from "~/app/store/parent/parentSlice";
import { useParams } from "react-router-dom";

type Props = {};

const AttendancesCards = (props: Props) => {
  const { team_id, kpi_id, sport_id } = useParams();
  const { data: user } = useUserQuery(null);
  const [attendData, setAttendData] = useState<TeamPlayersAttendStatistics>();
  const timeFilter = useSelector(timeFilterFn);

  // fetch Kpis And Attend for coach user
  const { data: coachTeamPlayersAttends } =
    useCoachTeamPlayersAttendancesStatisticsQuery(
      {
        team_id: team_id,
        month: timeFilter?.month,
        year: timeFilter?.year,
      },
      {
        skip:
          !team_id ||
          !timeFilter?.month ||
          !timeFilter?.year ||
          user?.user_type !== "Coach",
      }
    );

  // Fetch Kpis and Attends for the supervisor

  const { data: superTeamPlayersAttends } =
    useSuperTeamAttendPlayersStatisticsQuery(
      {
        team_id: team_id,
        sport_id: sport_id,
        month: timeFilter?.month,
        year: timeFilter?.year,
      },
      {
        skip:
          !team_id ||
          !sport_id ||
          !timeFilter?.month ||
          !timeFilter?.year ||
          user?.user_type !== "Supervisor",
      }
    );

  // Fetch Kpis and Attends for the Admin

  const { data: adminTeamPlayersAttends } =
    useAdminTeamAttendPlayersStatisticsQuery(
      {
        team_id: team_id,
        sport_id: sport_id,
        month: timeFilter?.month,
        year: timeFilter?.year,
      },
      {
        skip:
          !team_id ||
          !sport_id ||
          !timeFilter?.month ||
          !timeFilter?.year ||
          user?.user_type !== "Admin",
      }
    );

  useEffect(() => {
    if (superTeamPlayersAttends) setAttendData(superTeamPlayersAttends);
    if (coachTeamPlayersAttends) setAttendData(coachTeamPlayersAttends);
    if (adminTeamPlayersAttends) setAttendData(adminTeamPlayersAttends);
  }, [
    superTeamPlayersAttends,
    coachTeamPlayersAttends,
    adminTeamPlayersAttends,
  ]);
  return (
    <>
      {attendData?.results.map((attendsPlayer) => {
        return (
          <div key={attendsPlayer.id}>
            <AttendReportsChart
              player_attendance={attendsPlayer.player_attendance}
              name={attendsPlayer.name}
            />
          </div>
        );
      })}
    </>
  );
};

export default AttendancesCards;
