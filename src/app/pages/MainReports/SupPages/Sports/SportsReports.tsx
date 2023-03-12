import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@mantine/core";
import ReportsChartCard from "~/@main/components/MainReports/ReportsChartCard";
import PrintComp from "~/@main/PrintComp";
import { useSuperSportStatisticsQuery } from "~/app/store/supervisor/supervisorMainApi";
import { useAdminSportStatisticsQuery } from "~/app/store/clubManager/clubManagerApi";
import { useUserQuery } from "~/app/store/user/userApi";

type Props = {};

const items = [
  { title: "Reports", href: "/main-reports" },
  { title: "Sports", href: "" },
].map((item, index) => (
  <Link to={item.href} key={index}>
    {item.title}
  </Link>
));

const SportsReports = (props: Props) => {
  const { data: user } = useUserQuery({});

  const { data: sportStatistics } = useSuperSportStatisticsQuery(
    {},
    { skip: user?.user_type !== "Supervisor" }
  );
  const { data: adminSportsStatistics } = useAdminSportStatisticsQuery(
    { club_id: user?.club },
    { skip: user?.user_type !== "Admin" || !user?.club }
  );
  const navigate = useNavigate();

  return (
    <div className="container w-11/12 mx-auto">
      <div className="my-4">
        <Breadcrumbs className="text-perfGray3" separator="→">
          {items}
        </Breadcrumbs>
      </div>
      <PrintComp>
        <div className="reports flex flex-wrap gap-4 justify-center sm:justify-start items-center my-10">
          <>
            {sportStatistics && (
              <ReportsChartCard
                onClickFun={() => navigate(`${sportStatistics.id}/teams`)}
                name={sportStatistics?.name}
                statistics={sportStatistics?.statistics}
              />
            )}
            {adminSportsStatistics &&
              adminSportsStatistics.results.map((sport) => {
                return (
                  <ReportsChartCard
                    key={sport.id}
                    onClickFun={() => navigate(`${sport.id}/teams`)}
                    name={sport?.name}
                    statistics={sport?.statistics}
                  />
                );
              })}
          </>
        </div>
      </PrintComp>
    </div>
  );
};

export default SportsReports;
