import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Breadcrumbs, Skeleton } from "@mantine/core";
import ReportsChartCard from "~/@main/components/MainReports/ReportsChartCard";
import TeamInfoCard from "./components/TeamInfoCard";
import PrintComp from "~/@main/PrintComp";
import {
  useCoachTeamInfoQuery,
  useCoachTeamKpisStatisticsQuery,
} from "~/app/store/coach/coachApi";

type Props = {};

const OneTeam = (props: Props) => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data: teamKpisStatistics, isLoading } =
    useCoachTeamKpisStatisticsQuery({ team_id: id }, { skip: !id });

  const { data: teamInfo } = useCoachTeamInfoQuery(
    { team_id: id },
    { skip: !id }
  );

  const items = [
    { title: "Categories", href: "/main-reports" },
    { title: "Teams", href: "/main-reports/sports/teams" },
    { title: `Team ${teamInfo?.name}`, href: "" },
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
          {isLoading && (
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
          {teamKpisStatistics?.results.map((kpi) => {
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
