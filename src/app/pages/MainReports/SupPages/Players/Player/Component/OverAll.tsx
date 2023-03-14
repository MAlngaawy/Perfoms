import { Avatar } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReportsChartCard from "~/@main/components/MainReports/ReportsChartCard";
import Info from "~/@main/components/Info";
import PrintComp from "~/@main/PrintComp";
import {
  useCoachPlayerKpiStatisticsQuery,
  useCoachPlayersAttendStatisticsQuery,
} from "~/app/store/coach/coachApi";
import AttendReportsChart from "~/@main/components/MainReports/AttendReportsChart";
import {
  CoachPlayerInfo,
  PlayerMonthsAttendancesStatistics,
  TeamsStatistics,
} from "~/app/store/types/coach-types";
import {
  useSuperPlayerKpiStatisticsQuery,
  useSuperPlayersAttendStatisticsQuery,
} from "~/app/store/supervisor/supervisorMainApi";
import {
  useAdminPlayerKpiStatisticsQuery,
  useAdminPlayersAttendStatisticsQuery,
} from "~/app/store/clubManager/clubManagerApi";
import { useSelector } from "react-redux";
import { timeFilterFn } from "~/app/store/parent/parentSlice";
import {
  useGetUserAchievementsQuery,
  useUserQuery,
} from "~/app/store/user/userApi";

type Props = {
  reportType: string;
  playerInfo: CoachPlayerInfo | undefined;
};

const OverAll = ({ playerInfo, reportType }: Props) => {
  const [data, setData] = useState<TeamsStatistics>();
  const { data: user } = useUserQuery({});
  const timefilter = useSelector(timeFilterFn);
  const [attendData, setAttendData] =
    useState<PlayerMonthsAttendancesStatistics>();
  const { id } = useParams();

  const { data: coachPlayerKpisStatisticsData } =
    useCoachPlayerKpiStatisticsQuery(
      {
        player_id: id,
        date_from: timefilter.from_date,
        date_to: timefilter.to_date,
      },
      {
        skip:
          !id ||
          !timefilter.from_date ||
          !timefilter.to_date ||
          user?.user_type !== "Coach",
      }
    );
  const { data: coachPlayerAttendancesStatistics } =
    useCoachPlayersAttendStatisticsQuery(
      { player_id: id },
      { skip: !id || user?.user_type !== "Coach" }
    );

  const { data: superPlayerKpisStatisticsData } =
    useSuperPlayerKpiStatisticsQuery(
      {
        player_id: id,
        date_from: timefilter.from_date,
        date_to: timefilter.to_date,
      },
      { skip: !id || user?.user_type !== "Supervisor" }
    );
  const { data: superPlayerAttendancesStatistics } =
    useSuperPlayersAttendStatisticsQuery(
      { player_id: id },
      {
        skip:
          !id ||
          !timefilter.from_date ||
          !timefilter.to_date ||
          user?.user_type !== "Supervisor",
      }
    );

  const { data: adminPlayerKpisStatisticsData } =
    useAdminPlayerKpiStatisticsQuery(
      {
        player_id: id,
        date_from: timefilter.from_date,
        date_to: timefilter.to_date,
      },
      {
        skip:
          !id ||
          !timefilter.from_date ||
          !timefilter.to_date ||
          user?.user_type !== "Admin",
      }
    );

  const { data: adminPlayerAttendancesStatistics } =
    useAdminPlayersAttendStatisticsQuery(
      { player_id: id },
      { skip: !id || user?.user_type !== "Admin" }
    );

  useEffect(() => {
    if (coachPlayerKpisStatisticsData) setData(coachPlayerKpisStatisticsData);
    if (coachPlayerAttendancesStatistics)
      setAttendData(coachPlayerAttendancesStatistics);

    if (superPlayerKpisStatisticsData) setData(superPlayerKpisStatisticsData);
    if (superPlayerAttendancesStatistics)
      setAttendData(superPlayerAttendancesStatistics);

    if (adminPlayerKpisStatisticsData) setData(adminPlayerKpisStatisticsData);
    if (adminPlayerAttendancesStatistics)
      setAttendData(adminPlayerAttendancesStatistics);
  }, [
    coachPlayerKpisStatisticsData,
    coachPlayerAttendancesStatistics,
    superPlayerKpisStatisticsData,
    superPlayerAttendancesStatistics,
    adminPlayerKpisStatisticsData,
    adminPlayerAttendancesStatistics,
  ]);

  return (
    <PrintComp>
      <div className="reports flex-row items-stretch justify-center flex flex-wrap gap-4 my-6">
        {/* <TeamInfoCard /> */}
        <div>
          <div className="teamInfoCard shadow-lg bg-white h-full flex-col gap-4 rounded-xl p-4 flex w-64">
            <h2> {playerInfo?.name} </h2>
            <div className="flex flex-col gap-6">
              <div className="flex justify-between gap-6">
                <Avatar src={playerInfo?.icon} className="h-full" size="xl" />
                <div className="flex flex-col ">
                  <Info label="name" value={playerInfo?.name} />
                  <Info label="Age" value={playerInfo?.dob} />
                </div>
              </div>
              <div className="flex  gap-6 justify-between">
                <Info label="Weight" value={playerInfo?.weight} />
                <Info label="Height" value={playerInfo?.height} />
              </div>
              <div className="flex  gap-6 justify-between">
                <Info label="Sport" value={playerInfo?.sport} />
              </div>
            </div>
          </div>
        </div>
        {reportType === "Performances" ? (
          <>
            {data?.results?.map((kpi) => {
              return (
                <div key={kpi.id}>
                  <ReportsChartCard
                    clickable={false}
                    name={kpi.name}
                    statistics={kpi.statistics}
                  />
                </div>
              );
            })}
          </>
        ) : (
          <>
            {attendData?.map((attend) => {
              return (
                <div key={attend.name}>
                  <AttendReportsChart
                    player_attendance={attend.statistics}
                    name={attend.name}
                  />
                </div>
              );
            })}
          </>
        )}
      </div>
    </PrintComp>
  );
};

export default OverAll;
