import React, { useState, useRef } from "react";
import { Grid, Menu, Button } from "@mantine/core";
import Card from "~/@main/components/Card";
import AppIcons from "~/@main/core/AppIcons";
import AttendanceTable from "./components/AttendanceTable";
import TotalAttendance from "./components/TotalAttendance";
// import AttendanceCalender from "~/@main/components/AttendanceCalendar";
import CustomCalendar from "~/@main/components/Calendar";
import AddPlayer from "../home/molecules/AddPlayer";
import { useSelector } from "react-redux";
import { selectedPlayerFn } from "~/app/store/parent/parentSlice";
import TimeFilter from "~/@main/components/TimeFilter";
import TeamFilter from "../../../@main/components/TeamFilter";
import useWindowSize from "~/@main/hooks/useWindowSize";
import ActionsCard from "~/@main/components/ActionsCard";
import RecommendationsCard from "~/@main/components/RecommendationsCard";
import HomePlayerInfoCard from "../../../@main/components/HomePlayerInfoCard";
import ReportsPageLoading from "./components/ReportsPageLoading";
import PerformanceSummaryCard from "~/@main/components/PerformanceSummaryCard";
import AttendancesSmallCards from "./components/AttendancesSmallCards";
import { useReactToPrint } from "react-to-print";
// import { ComponentToPrint } from "./components/ComponentToPrint";
import PrintComp from "~/@main/PrintComp";

// ==============
const ReportPage = () => {
  const player = useSelector(selectedPlayerFn);
  const widowSize = useWindowSize();
  // const perfCompRef = useRef<HTMLInputElement>(null);
  // const attCompRef = useRef<HTMLInputElement>(null);
  // const handlePrint = useReactToPrint({
  //   content: (): any => perfCompRef.current,
  // });
  // const handlePrint2 = useReactToPrint({
  //   content: (): any => attCompRef.current,
  // });

  const [reportType, setReportType] =
    useState<"Performances" | "Attendances">("Performances");
  return (
    <>
      {player ? (
        <div className="report-page px-5 mb-20">
          <div className="flex flex-col sm:flex-row gap-4 my-4 justify-between items-center">
            <div className="flex gap-4">
              <AddPlayer />
              {widowSize.width && widowSize.width < 768 && <TimeFilter />}
            </div>
            <div className="flex gap-4">
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <button className="flex gap-2 text-xs sm:text-sm justify-center items-center text-white bg-perfBlue py-2 px-4 xs:px-6 rounded-3xl">
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
              <TeamFilter />
              {widowSize.width && widowSize.width >= 768 && <TimeFilter />}
            </div>
          </div>
          {reportType === "Performances" ? (
            <PrintComp>
              <div className="bg-pagesBg">
                <Grid columns={12} gutter={"sm"}>
                  <Grid.Col sm={3} md={2.5} span={12}>
                    <HomePlayerInfoCard />
                  </Grid.Col>
                  <Grid.Col sm={9} md={9.5} span={12}>
                    <PerformanceSummaryCard />
                  </Grid.Col>
                </Grid>
                <Grid columns={12} gutter={"sm"} className="info mt-3">
                  <Grid.Col sm={4} span={12}>
                    <Card
                      color="text-[#27AE60]"
                      bg="bg-fadedGreen"
                      powerType="Strengths"
                      player_id={player?.id}
                    />
                  </Grid.Col>
                  <Grid.Col sm={4} span={12}>
                    <Card
                      color="text-[#F2C94C]"
                      bg="bg-fadedYellow"
                      powerType="Moderate"
                      player_id={player?.id}
                    />
                  </Grid.Col>
                  <Grid.Col sm={4} span={12}>
                    <Card
                      color="text-[#EB5757]"
                      bg="bg-fadedRed"
                      powerType="Weaknesses"
                      player_id={player?.id}
                    />
                  </Grid.Col>
                </Grid>
                <Grid columns={12} gutter={"sm"} className="info mt-3">
                  <Grid.Col sm={6} span={12}>
                    <ActionsCard player_id={player?.id} />
                  </Grid.Col>
                  <Grid.Col sm={6} span={12}>
                    <RecommendationsCard player_id={player?.id} />
                  </Grid.Col>
                </Grid>{" "}
              </div>
            </PrintComp>
          ) : (
            <PrintComp>
              <div className="attendances">
                <Grid gutter={"sm"}>
                  <Grid.Col span={12} md={2.5}>
                    <div className="flex flex-col xs:flex-row md:flex-col gap-2 h-full">
                      <HomePlayerInfoCard />
                      <div className="note bg-white rounded-3xl w-full p-4 h-full">
                        <h2 className="text-lg font-normal text-perfGray1 pb-4">
                          Overall notes
                        </h2>
                        <p className=" text-base font-normal text-perfGray3">
                          Fitness Flexibility 10 Exercises to Improve Your
                          Flexibility 1. Standing Quad Stretch. Stand with your
                          feet together. ... 2. Standing Side Stretch
                        </p>
                      </div>
                    </div>
                  </Grid.Col>

                  {/* Right Column Attendance Charts And numbers */}
                  <Grid.Col span={12} md={9.5}>
                    <Grid gutter={"sm"}>
                      <Grid.Col span={12}>
                        <AttendancesSmallCards />
                      </Grid.Col>
                      {/* Attedance Summary Table */}
                      <Grid.Col span={12} sm={8}>
                        <div className="bg-white h-full rounded-3xl p-4">
                          <AttendanceTable />
                        </div>
                      </Grid.Col>

                      <Grid.Col span={12} sm={4}>
                        <div className="flex flex-col gap-4">
                          {/* Total Attendace Pie Chart  */}
                          <div className="bg-white rounded-3xl">
                            <TotalAttendance />
                          </div>

                          {/* Attendance Calender */}
                          <CustomCalendar pageName="reports" />
                        </div>
                      </Grid.Col>
                    </Grid>
                  </Grid.Col>
                </Grid>
              </div>
            </PrintComp>
          )}
        </div>
      ) : (
        <ReportsPageLoading type="Performances" />
      )}
    </>
  );
};

export default ReportPage;
