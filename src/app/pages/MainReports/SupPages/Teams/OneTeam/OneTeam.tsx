import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Breadcrumbs, Skeleton } from "@mantine/core";
import ReportsChartCard from "~/@main/components/MainReports/ReportsChartCard";
import TeamInfoCard from "./components/TeamInfoCard";
import PrintComp from "~/@main/PrintComp";
import {
  useSuperSportStatisticsQuery,
  useSuperTeamInfoQuery,
  useSuperTeamKpisStatisticsQuery,
} from "~/app/store/supervisor/supervisorMainApi";
import {
  useCoachTeamInfoQuery,
  useCoachTeamKpisStatisticsQuery,
} from "~/app/store/coach/coachApi";
import { useUserQuery } from "~/app/store/user/userApi";
import { TeamsStatistics } from "~/app/store/types/coach-types";
import {
  useAdminTeamInfoQuery,
  useAdminTeamKpisStatisticsQuery,
} from "~/app/store/clubManager/clubManagerApi";
import CardsWrapper from "~/@main/components/MainReports/CardsWrapper";

type Props = {};

const OneTeam = (props: Props) => {
  const [data, setData] = useState<TeamsStatistics>();
  const navigate = useNavigate();
  const { data: user } = useUserQuery(null);
  const { team_id, sport_id } = useParams();

  // Fetch Kpis Statistics Data
  const { data: coachTeamKpisStatistics, isLoading } =
    useCoachTeamKpisStatisticsQuery(
      { team_id, sport_id },
      { skip: !team_id || user?.user_type !== "Coach" }
    );

  const { data: superTeamKpisStatistics, isLoading: superLoading } =
    useSuperTeamKpisStatisticsQuery(
      { team_id, sport_id },
      { skip: !team_id || user?.user_type !== "Supervisor" }
    );

  const { data: adminTeamKpisStatistics, isLoading: adminLoading } =
    useAdminTeamKpisStatisticsQuery(
      { team_id, sport_id: sport_id },
      { skip: !team_id || !sport_id || user?.user_type !== "Admin" }
    );

  // Fetch Team info Data
  const { data: coachTeamInfo } = useCoachTeamInfoQuery(
    { team_id: team_id },
    { skip: !team_id || user?.user_type !== "Coach" }
  );
  const { data: superTeamInfo } = useSuperTeamInfoQuery(
    { team_id: team_id },
    { skip: !team_id || user?.user_type !== "Supervisor" }
  );
  const { data: adminTeamInfo } = useAdminTeamInfoQuery(
    { team_id: team_id },
    { skip: !team_id || user?.user_type !== "Admin" }
  );

  useEffect(() => {
    if (coachTeamKpisStatistics) setData(coachTeamKpisStatistics);
    if (superTeamKpisStatistics) setData(superTeamKpisStatistics);
    if (adminTeamKpisStatistics) setData(adminTeamKpisStatistics);
  }, [
    coachTeamKpisStatistics,
    superTeamKpisStatistics,
    adminTeamKpisStatistics,
  ]);

  const items = [
    { title: "Reports", href: "/main-reports" },
    { title: "Teams", href: `/main-reports/sports/${sport_id}/teams` },
    {
      title: `Team ${
        coachTeamInfo?.name || superTeamInfo?.name || adminTeamInfo?.name
      }`,
      href: "",
    },
  ].map((item, index) => (
    <Link to={item.href} key={index}>
      {item.title}
    </Link>
  ));

  return (
    <div className="container w-11/12 mx-auto">
      <div className="my-4">
        <Breadcrumbs className="text-perfGray3 flex-wrap gap-y-2" separator="→">
          {items}
        </Breadcrumbs>
      </div>
      <PrintComp
        documentTitle={
          coachTeamInfo?.name ||
          superTeamInfo?.name ||
          adminTeamInfo?.name ||
          "Team Reports"
        }
      >
        <CardsWrapper>
          <TeamInfoCard
            TeamInfoData={coachTeamInfo || superTeamInfo || adminTeamInfo}
          />
          {isLoading ||
            (superLoading && (
              <>
                <Skeleton height={300} width={250} radius="lg" />
                <Skeleton height={300} width={250} radius="lg" />
                <Skeleton height={300} width={250} radius="lg" />
                <Skeleton height={300} width={250} radius="lg" />
                <Skeleton height={300} width={250} radius="lg" />
                <Skeleton height={300} width={250} radius="lg" />
                <Skeleton height={300} width={250} radius="lg" />
              </>
            ))}
          {data?.results.map((kpi) => {
            return (
              <div key={kpi.id}>
                <ReportsChartCard
                  onClickFun={() => navigate(`${kpi.id}/players`)}
                  name={kpi.name}
                  statistics={kpi.statistics}
                  clickable={true}
                />
              </div>
            );
          })}
        </CardsWrapper>
      </PrintComp>
    </div>
  );
};

export default OneTeam;
