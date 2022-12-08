import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@mantine/core";
import ReportsChartCard from "~/@main/components/MainReports/ReportsChartCard";
import TeamInfoCard from "./components/TeamInfoCard";
import PrintComp from "~/@main/PrintComp";

type Props = {};

const kpis = [
  {
    name: "Counter KPI",
    icon: "ascascasc",
    id: 4,
    data: [
      {
        name: "strengths",
        value: 135,
      },
      {
        name: "moderate",
        value: 752,
      },
      {
        name: "weaknesses",
        value: 213,
      },
    ],
  },
  {
    name: "Mental KPI",
    icon: "ascascasc",
    id: 5,
    data: [
      {
        name: "strengths",
        value: 852,
      },
      {
        name: "moderate",
        value: 369,
      },
      {
        name: "weaknesses",
        value: 741,
      },
    ],
  },
  {
    name: "Blocks KPI",
    icon: "ascascasc",
    id: 6,
    data: [
      {
        name: "strengths",
        value: 123,
      },
      {
        name: "moderate",
        value: 456,
      },
      {
        name: "weaknesses",
        value: 789,
      },
    ],
  },
  {
    name: "Attacking KPIS",
    icon: "ascascasc",
    id: 1,
    data: [
      {
        name: "strengths",
        value: 50,
      },
      {
        name: "moderate",
        value: 300,
      },
      {
        name: "weaknesses",
        value: 10,
      },
    ],
  },

  {
    name: "Punching KPIS",
    icon: "ascascasc",
    id: 2,
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
    name: "Overall KPIS",
    icon: "ascascasc",
    id: 3,
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

const items = [
  { title: "Categories", href: "/main-reports" },
  { title: "Sports", href: "/main-reports/sports" },
  { title: "Teams", href: "/main-reports/sports/teams" },
  { title: "Team 17th", href: "" },
].map((item, index) => (
  <Link to={item.href} key={index}>
    {item.title}
  </Link>
));

const OneTeam = (props: Props) => {
  const navigate = useNavigate();

  return (
    <div className="container w-11/12 mx-auto">
      <div className="my-4">
        <Breadcrumbs className="text-perfGray3 flex-wrap gap-y-2" separator="→">
          {items}
        </Breadcrumbs>
      </div>
      <PrintComp>
        <div className="reports items-stretch justify-center xs:justify-start flex flex-wrap gap-4 my-10">
          <TeamInfoCard />
          {kpis.map((kpi) => {
            return (
              <div>
                <ReportsChartCard
                  onClickFun={() => navigate(`kpi/${kpi.id}`)}
                  name={kpi.name}
                  data={kpi.data}
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
