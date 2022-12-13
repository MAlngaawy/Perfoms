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

type Props = {};

const OneTeam = (props: Props) => {
  const [data, setData] = useState<TeamsStatistics>();
  const navigate = useNavigate();
  const { data: user } = useUserQuery(null);
  const { id } = useParams();
  const { data: sportStatistics } = useSuperSportStatisticsQuery({});

  // Fetch Kpis Statistics Data
  const { data: coachTeamKpisStatistics, isLoading } =
    useCoachTeamKpisStatisticsQuery({ team_id: id }, { skip: !id });

  const { data: superTeamKpisStatistics, isLoading: superLoading } =
    useSuperTeamKpisStatisticsQuery(
      { team_id: id, sport_id: sportStatistics?.id },
      { skip: !id }
    );

  // Fetch Team info Data
  const { data: coachTeamInfo } = useCoachTeamInfoQuery(
    { team_id: id },
    { skip: !id }
  );
  const { data: superTeamInfo } = useSuperTeamInfoQuery(
    { team_id: id },
    { skip: !id }
  );

  useEffect(() => {
    if (coachTeamKpisStatistics) setData(coachTeamKpisStatistics);
    if (superTeamKpisStatistics) setData(superTeamKpisStatistics);
  }, [coachTeamKpisStatistics, superTeamKpisStatistics]);

  const items = [
    { title: "Categories", href: "/main-reports" },
    { title: "Teams", href: "/main-reports/sports/teams" },
    {
      title: `Team ${
        user?.user_type === "Coach" ? coachTeamInfo?.name : superTeamInfo?.name
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
      <PrintComp>
        <div className="reports items-stretch justify-center xs:justify-start flex flex-wrap gap-4 my-10">
          <div>
            <TeamInfoCard />
          </div>
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
              <div>
                <ReportsChartCard
                  onClickFun={() => navigate(`kpi/${kpi.id}`)}
                  name={kpi.name}
                  statistics={kpi.statistics}
                />
              </div>
            );
          })}
        </div>
      </PrintComp>
    </div>
  );
};

export default OneTeam;
