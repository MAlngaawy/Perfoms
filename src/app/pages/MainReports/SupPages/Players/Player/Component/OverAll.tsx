import { Avatar, Breadcrumbs, Menu } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReportsChartCard from "~/@main/components/MainReports/ReportsChartCard";
import AppIcons from "~/@main/core/AppIcons";
// import TeamInfoCard from "../components/TeamInfoCard";
import TimeFilter from "~/@main/components/TimeFilter";
import Info from "~/@main/components/Info";
import PrintComp from "~/@main/PrintComp";
import {
  useCoachPlayerKpiStatisticsQuery,
  useCoachPlayersAttendStatisticsQuery,
  useGetPlayerInfoQuery,
} from "~/app/store/coach/coachApi";
import AttendReportsChart from "~/@main/components/MainReports/AttendReportsChart";
import {
  PlayerMonthsAttendancesStatistics,
  TeamsStatistics,
} from "~/app/store/types/coach-types";

type Props = {
  reportType: string;
};

const OverAll = ({ reportType }: Props) => {
  const [data, setData] = useState<TeamsStatistics>();
  const [attendData, setAttendData] =
    useState<PlayerMonthsAttendancesStatistics>();
  const { id } = useParams();

  // Coach Player Performances Statistics
  const { data: coachPlayerKpisStatisticsData } =
    useCoachPlayerKpiStatisticsQuery({ player_id: id }, { skip: !id });

  // Coach Player Atttendances Statistics
  const { data: coachPlayerAttendancesStatistics } =
    useCoachPlayersAttendStatisticsQuery({ player_id: id }, { skip: !id });

  const { data: playerInfo } = useGetPlayerInfoQuery(
    { player_id: id },
    { skip: !id }
  );

  useEffect(() => {
    if (coachPlayerKpisStatisticsData) setData(coachPlayerKpisStatisticsData);
    if (coachPlayerAttendancesStatistics)
      setAttendData(coachPlayerAttendancesStatistics);
  }, [coachPlayerKpisStatisticsData, coachPlayerAttendancesStatistics]);

  return (
    <PrintComp>
      <div className="reports items-stretch justify-center xs:justify-start flex flex-wrap gap-4 my-6">
        {/* <TeamInfoCard /> */}

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
              <Info
                label="Parent"
                value={id === "3" ? "hasan kamal" : "Wael Emerah"}
              />
            </div>
          </div>
        </div>

        {reportType === "Performances" ? (
          <>
            {data?.results?.map((kpi) => {
              return (
                <div>
                  <ReportsChartCard
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
                <div>
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
