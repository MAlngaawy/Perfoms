import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@mantine/core";
import ReportsChartCard from "~/@main/components/MainReports/ReportsChartCard";
import { useSuperTeamsQuery } from "~/app/store/supervisor/supervisorMainApi";
import PrintComp from "../../../../../@main/PrintComp";

const teams = [
  {
    name: "14th",
    icon: "ascascasc",
    id: 1,
    data: [
      {
        name: "strengths",
        value: 156,
      },
      {
        name: "moderate",
        value: 52,
      },
      {
        name: "weaknesses",
        value: 369,
      },
    ],
  },

  {
    name: "17th",
    icon: "ascascasc",
    id: 1,
    data: [
      {
        name: "strengths",
        value: 30,
      },
      {
        name: "moderate",
        value: 250,
      },
      {
        name: "weaknesses",
        value: 100,
      },
    ],
  },
];

type Props = {};

const items = [
  { title: "Categories", href: "/main-reports" },
  { title: "Sports", href: "/main-reports/sports" },
  { title: "Teams", href: "" },
].map((item, index) => (
  <Link to={item.href} key={index}>
    {item.title}
  </Link>
));

const TeamsReports = (props: Props) => {
  const { data: superTeams } = useSuperTeamsQuery({});
  const navigate = useNavigate();

  useEffect(() => {
    console.log(superTeams);
  }, [superTeams]);

  return (
    <div className="container w-11/12 mx-auto">
      <div className="my-4">
        <Breadcrumbs className="text-perfGray3" separator="→">
          {items}
        </Breadcrumbs>
      </div>
      <PrintComp>
        <div className="reports flex flex-wrap gap-4 justify-center xs:justify-start items-center my-10">
          {teams.map((team) => {
            return (
              <div>
                <ReportsChartCard
                  onClickFun={() => navigate(`${team.id}`)}
                  name={team.name}
                  data={team.data}
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
