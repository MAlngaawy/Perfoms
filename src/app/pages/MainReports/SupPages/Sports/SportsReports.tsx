import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@mantine/core";
import ReportsChartCard from "~/@main/components/MainReports/ReportsChartCard";
import PrintComp from "~/@main/PrintComp";

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
    id: 1,
  },

  {
    name: "Football",
    icon: "ascascasc",
    id: 2,
    data: [
      {
        name: "strengths",
        value: 56,
      },
      {
        name: "moderate",
        value: 136,
      },
      {
        name: "weaknesses",
        value: 155,
      },
    ],
  },

  {
    name: "Swimming",
    icon: "ascascasc",
    id: 3,
    data: [
      {
        name: "strengths",
        value: 1000,
      },
      {
        name: "moderate",
        value: 652,
      },
      {
        name: "weaknesses",
        value: 125,
      },
    ],
  },
];

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
          {/* {sports.map((sport) => {
            return (
              <ReportsChartCard
                onClickFun={() => navigate(`teams`)}
                name={sport.name}
                data={sport.data}
              />
            );
          })} */}
        </div>
      </PrintComp>
    </div>
  );
};

export default SportsReports;
