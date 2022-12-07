import { Breadcrumbs, Menu } from "@mantine/core";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReportsChartCard from "~/@main/components/MainReports/ReportsChartCard";
import AppIcons from "~/@main/core/AppIcons";
import TeamInfoCard from "../components/TeamInfoCard";
import TimeFilter from "~/@main/components/TimeFilter";

type Props = {};

const membersKpi = [
  {
    name: "Ahmed Salah",
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
    name: "Mohammed Ali",
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
    name: "Laila Ali",
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
    name: "Mohye Ahmed",
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
    name: "Loay Morad",
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
    name: "Fares Medhat",
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

const membersAttendance = [
  {
    name: "Ahmed Salah",
    icon: "ascascasc",
    id: 4,
    data: [
      {
        name: "Attended",
        value: 19,
      },
      {
        name: "Absence",
        value: 50,
      },
      {
        name: "Upcoming",
        value: 130,
      },
    ],
  },
  {
    name: "Ahmed Salah",
    icon: "ascascasc",
    id: 4,
    data: [
      {
        name: "Attended",
        value: 135,
      },
      {
        name: "Absence",
        value: 752,
      },
      {
        name: "Upcoming",
        value: 213,
      },
    ],
  },
  {
    name: "Ahmed Salah",
    icon: "ascascasc",
    id: 4,
    data: [
      {
        name: "Attended",
        value: 135,
      },
      {
        name: "Absence",
        value: 752,
      },
      {
        name: "Upcoming",
        value: 213,
      },
    ],
  },
  {
    name: "Ahmed Salah",
    icon: "ascascasc",
    id: 4,
    data: [
      {
        name: "Attended",
        value: 135,
      },
      {
        name: "Absence",
        value: 752,
      },
      {
        name: "Upcoming",
        value: 213,
      },
    ],
  },
  {
    name: "Ahmed Salah",
    icon: "ascascasc",
    id: 4,
    data: [
      {
        name: "Attended",
        value: 135,
      },
      {
        name: "Absence",
        value: 752,
      },
      {
        name: "Upcoming",
        value: 213,
      },
    ],
  },
  {
    name: "Ahmed Salah",
    icon: "ascascasc",
    id: 4,
    data: [
      {
        name: "Attended",
        value: 135,
      },
      {
        name: "Absence",
        value: 752,
      },
      {
        name: "Upcoming",
        value: 213,
      },
    ],
  },
];

const TeamMembersKpi = (props: Props) => {
  const [reportType, setReportType] =
    useState<"Performances" | "Attendances">("Performances");
  const { id } = useParams();

  const items = [
    { title: "Categories", href: "/main-reports" },
    { title: "Sports", href: "/main-reports/sports" },
    { title: "Teams", href: "/main-reports/sports/teams" },
    { title: "Team 17th", href: `/main-reports/sports/teams/${id}` },
    {
      title: reportType === "Performances" ? "Punshing" : "Attendance",
      href: ``,
    },
  ].map((item, index) => (
    <Link to={item.href} key={index}>
      {item.title}
    </Link>
  ));

  const navigate = useNavigate();

  return (
    <div className="container w-11/12 mx-auto">
      <div className="my-4">
        <Breadcrumbs className="text-perfGray3 flex-wrap gap-y-2" separator="→">
          {items}
        </Breadcrumbs>
      </div>

      <div className="flex gap-4 justify-end">
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <button className="flex gap-2 text-xs sm:text-sm justify-center items-center text-white bg-perfBlue py-2 px-2 xs:px-4 rounded-3xl">
              <span>{reportType}</span>
              <AppIcons
                className="w-3 h-3"
                icon="ChevronDownIcon:outline"
              />{" "}
            </button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item onClick={() => setReportType("Performances")}>
              Performances
            </Menu.Item>
            <Menu.Item onClick={() => setReportType("Attendances")}>
              Attendances
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <TimeFilter />
      </div>

      <div className="reports items-stretch justify-center xs:justify-start flex flex-wrap gap-4 my-6">
        <TeamInfoCard />
        {reportType === "Performances" ? (
          <>
            {membersKpi.map((kpi) => {
              return (
                <div>
                  <ReportsChartCard
                    // onClickFun={() => navigate(`kpi/${kpi.id}`)}
                    clickable={false}
                    name={kpi.name}
                    data={kpi.data}
                  />
                </div>
              );
            })}
          </>
        ) : (
          <>
            {membersAttendance.map((attend) => {
              return (
                <div>
                  <ReportsChartCard
                    // onClickFun={() => navigate(`kpi/${attend.id}`)}
                    name={attend.name}
                    data={attend.data}
                    clickable={false}
                    chartColors={["#27AE60", "#EB5757", "#A3A3A3"]}
                  />
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default TeamMembersKpi;
