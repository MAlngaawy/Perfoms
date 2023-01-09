import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Breadcrumbs } from "@mantine/core";
import ReportsChartCard from "~/@main/components/MainReports/ReportsChartCard";
import {
  useSuperSportStatisticsQuery,
  useSuperTeamsQuery,
  useSuperTeamsStatisticsQuery,
} from "~/app/store/supervisor/supervisorMainApi";
import PrintComp from "../../../../../@main/PrintComp";
import { useCoachTeamStatisticsQuery } from "~/app/store/coach/coachApi";
import { useUserQuery } from "~/app/store/user/userApi";
import { TeamsStatistics } from "~/app/store/types/coach-types";
import { useAdminTeamsStatisticsQuery } from "~/app/store/clubManager/clubManagerApi";

type Props = {};

const items = [
  { title: "Categories", href: "/main-reports" },
  { title: "Teams", href: "" },
].map((item, index) => (
  <Link to={item.href} key={index}>
    {item.title}
  </Link>
));

const TeamsReports = (props: Props) => {
  const [data, setData] = useState<TeamsStatistics>();
  const { data: user } = useUserQuery({});
  const { sport_id } = useParams();
  const { data: sportStatistics } = useSuperSportStatisticsQuery(
    {},
    { skip: user?.user_type !== "Supervisor" }
  );
  const { data: superTeamsStatistics } = useSuperTeamsStatisticsQuery(
    { sport_id: sportStatistics?.id },
    { skip: !sportStatistics?.id || user?.user_type !== "Supervisor" }
  );
  const { data: adminTeamsStatistics } = useAdminTeamsStatisticsQuery(
    { sport_id: sport_id },
    { skip: !sport_id || user?.user_type !== "Admin" }
  );
  const { data: coachTeamsStatistics } = useCoachTeamStatisticsQuery(
    {},
    { skip: user?.user_type !== "Coach" }
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.user_type === "Coach") setData(coachTeamsStatistics);
    if (user?.user_type === "Supervisor") setData(superTeamsStatistics);
    if (user?.user_type === "Admin") setData(adminTeamsStatistics);
  }, [coachTeamsStatistics, superTeamsStatistics, adminTeamsStatistics]);

  return (
    <div className="container w-11/12 mx-auto">
      <div className="my-4">
        <Breadcrumbs className="text-perfGray3" separator="→">
          {items}
        </Breadcrumbs>
      </div>
      <PrintComp>
        <div className="reports flex flex-wrap gap-4 justify-center xs:justify-start items-stretch my-10">
          {data &&
            data?.results.map((team) => {
              return (
                <div key={team.id}>
                  <ReportsChartCard
                    onClickFun={() => navigate(`${team.id}/kpis`)}
                    name={team.name}
                    statistics={team.statistics}
                  />
                </div>
              );
            })}
        </div>
      </PrintComp>
    </div>
  );
};

export default TeamsReports;
