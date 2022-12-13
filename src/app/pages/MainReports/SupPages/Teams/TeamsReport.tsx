import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@mantine/core";
import ReportsChartCard from "~/@main/components/MainReports/ReportsChartCard";
import { useSuperTeamsQuery } from "~/app/store/supervisor/supervisorMainApi";
import PrintComp from "../../../../../@main/PrintComp";
import { useCoachTeamStatisticsQuery } from "~/app/store/coach/coachApi";
import { useUserQuery } from "~/app/store/user/userApi";

type Props = {};

const TeamsReports = (props: Props) => {
  const [data, setData] = useState();
  const { data: superTeams } = useSuperTeamsQuery({});
  const { data: coachTeamsStatistics } = useCoachTeamStatisticsQuery({});
  const navigate = useNavigate();
  const { data: user } = useUserQuery(null);

  useEffect(() => {
    // console.log(superTeams);
  }, [superTeams]);

  const items = [
    { title: "Categories", href: "/main-reports" },
    // { title: "Sports", href: "/main-reports/sports" },
    { title: "Teams", href: "" },
  ].map((item, index) => (
    <Link to={item.href} key={index}>
      {item.title}
    </Link>
  ));

  return (
    <div className="container w-11/12 mx-auto">
      <div className="my-4">
        <Breadcrumbs className="text-perfGray3" separator="→">
          {items}
        </Breadcrumbs>
      </div>
      <PrintComp>
        <div className="reports flex flex-wrap gap-4 justify-center xs:justify-start items-center my-10">
          {coachTeamsStatistics &&
            coachTeamsStatistics?.results.map((team) => {
              return (
                <div>
                  <ReportsChartCard
                    onClickFun={() => navigate(`${team.id}`)}
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
