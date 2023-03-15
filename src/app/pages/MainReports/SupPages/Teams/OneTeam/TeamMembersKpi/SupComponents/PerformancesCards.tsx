import { Skeleton } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAdminTeamKpiPlayersStatisticsQuery } from "~/app/store/clubManager/clubManagerApi";
import { useCoachTeamPlayersKpiStatisticsQuery } from "~/app/store/coach/coachApi";
import { timeFilterFn } from "~/app/store/parent/parentSlice";
import { useSuperTeamKpiPlayersStatisticsQuery } from "~/app/store/supervisor/supervisorMainApi";
import { TeamKpiPlayersStatistics } from "~/app/store/types/coach-types";
import { useUserQuery } from "~/app/store/user/userApi";
import ReportsChartCard from "~/@main/components/MainReports/ReportsChartCard";

const PerformancesCards = ({ setKpiName }: any) => {
  const timeFilter = useSelector(timeFilterFn);
  const [kpiData, setKpiData] = useState<TeamKpiPlayersStatistics>();
  const { team_id, kpi_id } = useParams();
  const { data: user } = useUserQuery(null);

  // fetch Kpis And Attend for coach user
  const { data: coachTeamplayerskpi, isLoading: performancesLoading } =
    useCoachTeamPlayersKpiStatisticsQuery(
      {
        team_id: team_id,
        kpi_id: kpi_id,
        date_from: timeFilter?.from_date,
        date_to: timeFilter?.to_date,
      },
      {
        skip:
          !team_id ||
          !kpi_id ||
          !timeFilter?.from_date ||
          !timeFilter?.to_date ||
          user?.user_type !== "Coach",
      }
    );

  // Fetch Kpis and Attends for the supervisor
  const { data: superTeamPlayersKpi } = useSuperTeamKpiPlayersStatisticsQuery(
    {
      team_id: team_id,
      kpi_id: kpi_id,
      date_from: timeFilter?.from_date,
      date_to: timeFilter?.to_date,
    },
    {
      skip:
        !team_id ||
        !kpi_id ||
        !timeFilter?.from_date ||
        !timeFilter?.to_date ||
        user?.user_type !== "Supervisor",
    }
  );

  // Fetch Kpis and Attends for the Admin
  const { data: adminTeamPlayersKpi } = useAdminTeamKpiPlayersStatisticsQuery(
    {
      team_id: team_id,
      kpi_id: kpi_id,
      date_from: timeFilter?.from_date,
      date_to: timeFilter?.to_date,
    },
    {
      skip:
        !team_id ||
        !kpi_id ||
        !timeFilter?.from_date ||
        !timeFilter?.to_date ||
        user?.user_type !== "Admin",
    }
  );

  useEffect(() => {
    if (superTeamPlayersKpi) setKpiData(superTeamPlayersKpi);
    if (coachTeamplayerskpi) setKpiData(coachTeamplayerskpi);
    if (adminTeamPlayersKpi) setKpiData(adminTeamPlayersKpi);
  }, [superTeamPlayersKpi, coachTeamplayerskpi, adminTeamPlayersKpi]);
  setKpiName(kpiData?.results[0].kpi.name);

  return (
    <>
      {performancesLoading && (
        <>
          <Skeleton height={300} width={250} radius="lg" />
          <Skeleton height={300} width={250} radius="lg" />
          <Skeleton height={300} width={250} radius="lg" />
          <Skeleton height={300} width={250} radius="lg" />
          <Skeleton height={300} width={250} radius="lg" />
          <Skeleton height={300} width={250} radius="lg" />
          <Skeleton height={300} width={250} radius="lg" />
        </>
      )}
      {kpiData?.results.map((kpiPlayer) => {
        console.log(kpiPlayer.name);
        return (
          <div key={kpiPlayer.id}>
            <ReportsChartCard
              // onClickFun={() => navigate(`kpi/${kpi.id}`)}
              clickable={false}
              name={kpiPlayer?.kpi?.name + " - " + kpiPlayer?.name}
              statistics={kpiPlayer?.kpi?.statistics}
            />
          </div>
        );
      })}
    </>
  );
};

export default PerformancesCards;
