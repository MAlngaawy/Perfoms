import { Avatar, Breadcrumbs, Menu } from "@mantine/core";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReportsChartCard from "~/@main/components/MainReports/ReportsChartCard";
import AppIcons from "~/@main/core/AppIcons";
// import TeamInfoCard from "../components/TeamInfoCard";
import TimeFilter from "~/@main/components/TimeFilter";
import Info from "~/@main/components/Info";
import PrintComp from "~/@main/PrintComp";

type Props = {
  reportType: string;
};

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
const membersAttendance = [
  {
    name: "Jan",
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
    name: "Feb",
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
    name: "Mar",
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
    name: "April",
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
    name: "May",
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
    name: "Jun",
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

const OverAll = ({ reportType }: Props) => {
  const { id } = useParams();

  return (
    <PrintComp>
      <div className="reports items-stretch justify-center xs:justify-start flex flex-wrap gap-4 my-6">
        {/* <TeamInfoCard /> */}

        <div className="teamInfoCard shadow-lg bg-white h-full flex-col gap-4 rounded-xl p-4 flex w-64">
          <h2> {id === "3" ? "Yahia's info." : "Habeba Wael"} </h2>
          <div className="flex flex-col gap-6">
            <div className="flex justify-between gap-6">
              <Avatar
                src={
                  id === "3"
                    ? "https://djangoperforms.blob.core.windows.net/media/icons/bebca1d0d7e348f1b8b2ab1542cd1dc4.jpeg"
                    : "https://djangoperforms.blob.core.windows.net/media/icons/9c16812fc69448ecbe1625bcd9eb9622.jpeg"
                }
                className="h-full"
                size="xl"
              />
              <div className="flex flex-col ">
                <Info
                  label="name"
                  value={id === "3" ? "Yahia Hassan" : "Habeba Wael"}
                />
                <Info label="Age" value="15/12/2016 (6)" />
              </div>
            </div>
            <div className="flex  gap-6 justify-between">
              <Info label="Weight" value="50" />
              <Info label="Height" value="150" />
            </div>
            <div className="flex  gap-6 justify-between">
              <Info label="Sport" value="Taekwondo" />
              <Info
                label="Parent"
                value={id === "3" ? "hasan kamal" : "Wael Emerah"}
              />
            </div>
          </div>
        </div>

        {reportType === "Performances" ? (
          <>
            {kpis.map((kpi) => {
              return (
                <div>
                  {/* <ReportsChartCard
                    // onClickFun={() => navigate(`kpi/${kpi.id}`)}
                    clickable={false}
                    name={kpi.name}
                    statistics={kpi.data}
                  /> */}
                </div>
              );
            })}
          </>
        ) : (
          <>
            {membersAttendance.map((attend) => {
              return (
                <div>
                  {/* <ReportsChartCard
                    // onClickFun={() => navigate(`kpi/${attend.id}`)}
                    name={attend.name}
                    data={attend.data}
                    clickable={false}
                    chartColors={["#27AE60", "#EB5757", "#A3A3A3"]}
                  /> */}
                </div>
              );
            })}
          </>
        )}
      </div>
    </PrintComp>
  );
};

export default OverAll;
