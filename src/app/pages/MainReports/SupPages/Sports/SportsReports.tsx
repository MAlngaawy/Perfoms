import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@mantine/core";
import ReportsChartCard from "~/@main/components/MainReports/ReportsChartCard";
import PrintComp from "~/@main/PrintComp";
import { useSuperSportStatisticsQuery } from "~/app/store/supervisor/supervisorMainApi";

type Props = {};

const items = [
  { title: "categories", href: "/main-reports" },
  { title: "Sports", href: "" },
].map((item, index) => (
  <Link to={item.href} key={index}>
    {item.title}
  </Link>
));

const SportsReports = (props: Props) => {
  const { data: sportStatistics } = useSuperSportStatisticsQuery({});
  const navigate = useNavigate();

  return (
    <div className="container w-11/12 mx-auto">
      <div className="my-4">
        <Breadcrumbs className="text-perfGray3" separator="→">
          {items}
        </Breadcrumbs>
      </div>
      <PrintComp>
        <div className="reports flex flex-wrap gap-4 items-center my-10">
          {sportStatistics && (
            <ReportsChartCard
              onClickFun={() => navigate(`teams`)}
              name={sportStatistics?.name}
              statistics={sportStatistics?.statistics}
            />
          )}
        </div>
      </PrintComp>
    </div>
  );
};

export default SportsReports;
