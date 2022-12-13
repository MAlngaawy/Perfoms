import { Breadcrumbs, Menu, Skeleton } from "@mantine/core";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReportsChartCard from "~/@main/components/MainReports/ReportsChartCard";
import AppIcons from "~/@main/core/AppIcons";
import TeamInfoCard from "../components/TeamInfoCard";
import TimeFilter from "~/@main/components/TimeFilter";
import PrintComp from "~/@main/PrintComp";
import {
  useCoachTeamInfoQuery,
  useCoachTeamPlayersAttendancesStatisticsQuery,
  useCoachTeamPlayersKpiStatisticsQuery,
} from "~/app/store/coach/coachApi";
import AttendReportsChart from "~/@main/components/MainReports/AttendReportsChart";

type Props = {};

const TeamMembersKpi = (props: Props) => {
  const [reportType, setReportType] =
    useState<"Performances" | "Attendances">("Performances");
  const { id, kpi_id } = useParams();

  const { data: teamplayerskpi, isLoading: performancesLoading } =
    useCoachTeamPlayersKpiStatisticsQuery(
      { team_id: id, kpi_id: kpi_id },
      { skip: !id || !kpi_id }
    );

  const { data: teamPlayersAttends } =
    useCoachTeamPlayersAttendancesStatisticsQuery(
      { team_id: id },
      { skip: !id }
    );

  const { data: teamInfo } = useCoachTeamInfoQuery(
    { team_id: id },
    { skip: !id }
  );

  const items = [
    { title: "Categories", href: "/main-reports" },
    { title: "Teams", href: "/main-reports/sports/teams" },
    {
      title: `Team ${teamInfo?.name}`,
      href: `/main-reports/sports/teams/${id}`,
    },
    {
      title:
        reportType === "Performances"
          ? teamplayerskpi?.results[0].kpi.name
          : "Attendance",
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
              <AppIcons className="w-3 h-3" icon="ChevronDownIcon:outline" />
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
      <PrintComp>
        <div className="reports items-stretch justify-center xs:justify-start flex flex-wrap gap-4 my-6">
          <div>
            <TeamInfoCard />
          </div>

          {reportType === "Performances" ? (
            <>
              {performancesLoading && (
                <>
                  <Skeleton height={300} width={250} radius="lg" />
                  <Skeleton height={300} width={250} radius="lg" />
                  <Skeleton height={300} width={250} radius="lg" />
                  <Skeleton height={300} width={250} radius="lg" />
                  <Skeleton height={300} width={250} radius="lg" />
                  <Skeleton height={300} width={250} radius="lg" />
                  <Skeleton height={300} width={250} radius="lg" />
                </>
              )}
              {teamplayerskpi?.results.map((kpiPlayer) => {
                return (
                  <div>
                    <ReportsChartCard
                      // onClickFun={() => navigate(`kpi/${kpi.id}`)}
                      clickable={false}
                      name={kpiPlayer.kpi.name + " - " + kpiPlayer.name}
                      statistics={kpiPlayer.kpi.statistics}
                    />
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {teamPlayersAttends?.results.map((attendsPlayer) => {
                return (
                  <div>
                    <AttendReportsChart
                      player_attendance={attendsPlayer.player_attendance}
                      name={attendsPlayer.name}
                    />
                  </div>
                );
              })}
            </>
          )}
        </div>
      </PrintComp>
    </div>
  );
};

export default TeamMembersKpi;
