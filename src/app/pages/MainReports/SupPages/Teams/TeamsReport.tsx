import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@mantine/core";
import ReportsChartCard from "~/@main/components/MainReports/ReportsChartCard";
import { useSuperTeamsQuery } from "~/app/store/supervisor/supervisorMainApi";

type Props = {};

const items = [
  { title: "Categories", href: "/main-reports" },
  { title: "Sports", href: "/main-reports/sports" },
  { title: "Teams Reports", href: "" },
].map((item, index) => (
  <Link to={item.href} key={index}>
    {item.title}
  </Link>
));

const TeamsReports = (props: Props) => {
  const { data: superTeams } = useSuperTeamsQuery({});

  const teams = [
    {
      name: "14th",
      icon: "ascascasc",
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
      name: "15th",
      icon: "ascascasc",
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
      name: "16th",
      icon: "ascascasc",
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
      <div className="reports flex flex-wrap gap-4 items-center my-10">
        {teams.map((team) => {
          return (
            <div>
              <ReportsChartCard
                onClickFun={() => console.log("Team")}
                name={team.name}
                data={team.data}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamsReports;
