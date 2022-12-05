import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@mantine/core";
import ReportsChartCard from "~/@main/components/MainReports/ReportsChartCard";

type Props = {};

const items = [
  { title: "categories", href: "/main-reports" },
  { title: "Sports Reports", href: "" },
].map((item, index) => (
  <Link to={item.href} key={index}>
    {item.title}
  </Link>
));

const SportsReports = (props: Props) => {
  const sports = [
    {
      name: "Taekwondo",
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

    {
      name: "Taekwondo",
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

    {
      name: "Taekwondo",
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

  return (
    <div className="container w-11/12 mx-auto">
      <div className="my-4">
        <Breadcrumbs className="text-perfGray3" separator="→">
          {items}
        </Breadcrumbs>
      </div>
      <div className="reports flex flex-wrap gap-4 items-center my-10">
        {sports.map((sport) => {
          return <ReportsChartCard name={sport.name} data={sport.data} />;
        })}
      </div>
    </div>
  );
};

export default SportsReports;
