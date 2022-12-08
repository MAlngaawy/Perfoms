import React, { useState, useRef } from "react";
import { Grid, Menu, Button } from "@mantine/core";
import Card from "~/@main/components/Card";
import AppIcons from "~/@main/core/AppIcons";
import AttendanceTable from "~/app/pages/coachHome/components/AttendanceTable";
import TotalAttendance from "~/app/pages/reports/components/TotalAttendance";
import CustomCalendar from "~/@main/components/Calendar";
import TimeFilter from "~/@main/components/TimeFilter";
import useWindowSize from "~/@main/hooks/useWindowSize";
import ActionsCard from "~/@main/components/ActionsCard";
import RecommendationsCard from "~/@main/components/RecommendationsCard";
import HomePlayerInfoCard from "~/@main/components/HomePlayerInfoCard";
import ReportsPageLoading from "~/app/pages/reports/components/ReportsPageLoading";
import PerformanceSummaryCard from "~/@main/components/PerformanceSummaryCard";
import AttendancesSmallCards from "~/app/pages/reports/components/AttendancesSmallCards";
import { useReactToPrint } from "react-to-print";
import { selectedPlayerFn } from "~/app/store/parent/parentSlice";
import { useSelector } from "react-redux";

const strengths = [
  {
    name: "Fitness Flexibility",
    score: "4",
  },
  {
    name: "Fitness Balance",
    score: "4",
  },
  {
    name: "Fitness Endurance",
    score: "5",
  },
  {
    name: "Pushing Left Leg",
    score: "4",
  },
  {
    name: "Left leg",
    score: "5",
  },
  {
    name: "Pushing Right Leg",
    score: "5",
  },
];
const moderate = [
  {
    name: "Right leg",
    score: "3",
  },
  // {
  //   name: "Technique",
  //   score: "3",
  // },
  // {
  //   name: "Blocks Timing",
  //   score: "3",
  // },
  // {
  //   name: "Power",
  //   score: "3",
  // },
  {
    name: "Blocks Technique",
    score: "3",
  },
  {
    name: "Punching Timing",
    score: "3",
  },
];
const weaknesses = [
  {
    name: "Punching Power",
    score: "1",
  },
  {
    name: "Punching Technique",
    score: "2",
  },
  {
    name: "Behavior",
    score: "1",
  },
  {
    name: "Stances Position In Court",
    score: "2",
  },
  {
    name: "360",
    score: "2",
  },
];

type Props = {};

const Detailed = (props: Props) => {
  const player = useSelector(selectedPlayerFn);
  const widowSize = useWindowSize();
  const perfCompRef = useRef<HTMLInputElement>(null);
  const attCompRef = useRef<HTMLInputElement>(null);
  const handlePrint = useReactToPrint({
    content: (): any => perfCompRef.current,
  });
  const handlePrint2 = useReactToPrint({
    content: (): any => attCompRef.current,
  });

  const [reportType, setReportType] =
    useState<"Performances" | "Attendances">("Performances");

  return (
    // <div>
    //   <div className="report-page px-5 mb-20">
    //     <div className="flex flex-col sm:flex-row gap-4 my-4 justify-between items-center">
    //       <div className="flex gap-4">
    //         {widowSize.width && widowSize.width < 768 && <TimeFilter />}
    //       </div>
    //       <div className="flex gap-4">
    //         <Menu shadow="md" width={200}>
    //           <Menu.Target>
    //             <button className="flex gap-2 text-xs sm:text-sm justify-center items-center text-white bg-perfBlue py-2 px-4 xs:px-6 rounded-3xl">
    //               <span>{reportType}</span>
    //               <AppIcons
    //                 className="w-3 h-3"
    //                 icon="ChevronDownIcon:outline"
    //               />{" "}
    //             </button>
    //           </Menu.Target>

    //           <Menu.Dropdown>
    //             <Menu.Item onClick={() => setReportType("Performances")}>
    //               Performances
    //             </Menu.Item>
    //             <Menu.Item onClick={() => setReportType("Attendances")}>
    //               Attendances
    //             </Menu.Item>
    //           </Menu.Dropdown>
    //         </Menu>
    //       </div>
    //     </div>
    //     {reportType === "Performances" ? (
    //       <div>
    //         {/* <ComponentToPrint ref={componentRef} /> */}
    //         <div
    //           onClick={handlePrint}
    //           className="z-50 flex flex-col items-center justify-center  fixed right-20 bottom-20 opacity-70 hover:opacity-100 w-20 h-20 rounded-full cursor-pointer bg-perfBlue text-white"
    //         >
    //           <AppIcons
    //             className="w-8 h-8 text-white"
    //             icon="DocumentArrowDownIcon:outline"
    //           />
    //           <span>PDF</span>
    //         </div>
    //         <div className="bg-pagesBg" ref={perfCompRef}>
    //           <Grid columns={12} gutter={"sm"}>
    //             <Grid.Col sm={3} md={2.5} span={12}>
    //               <HomePlayerInfoCard />
    //             </Grid.Col>
    //             <Grid.Col sm={9} md={9.5} span={12}>
    //               <PerformanceSummaryCard />
    //             </Grid.Col>
    //           </Grid>
    //           <Grid columns={12} gutter={"sm"} className="info mt-3">
    //             <Grid.Col sm={4} span={12}>
    //               <Card
    //                 color="text-[#27AE60]"
    //                 bg="bg-fadedGreen"
    //                 powerType="Strengths"
    //                 scores={strengths}
    //               />
    //             </Grid.Col>
    //             <Grid.Col sm={4} span={12}>
    //               <Card
    //                 color="text-[#F2C94C]"
    //                 bg="bg-fadedYellow"
    //                 powerType="Moderate"
    //                 scores={moderate}
    //               />
    //             </Grid.Col>
    //             <Grid.Col sm={4} span={12}>
    //               <Card
    //                 color="text-[#EB5757]"
    //                 bg="bg-fadedRed"
    //                 powerType="Weaknesses"
    //                 scores={weaknesses}
    //               />
    //             </Grid.Col>
    //           </Grid>
    //           <Grid columns={12} gutter={"sm"} className="info mt-3">
    //             <Grid.Col sm={6} span={12}>
    //               <ActionsCard player_id={player?.id} />
    //             </Grid.Col>
    //             <Grid.Col sm={6} span={12}>
    //               <RecommendationsCard player_id={player?.id} />
    //             </Grid.Col>
    //           </Grid>{" "}
    //         </div>
    //       </div>
    //     ) : (
    //       <div className="attendances">
    //         <div className="bg-pagesBg" ref={attCompRef}>
    //           {/* Left Columns ( User Info And Note ) */}
    //           <div
    //             onClick={handlePrint2}
    //             className="z-50 flex flex-col items-center justify-center  fixed right-20 bottom-20 opacity-70 hover:opacity-100 w-20 h-20 rounded-full cursor-pointer bg-perfBlue text-white"
    //           >
    //             <AppIcons
    //               className="w-8 h-8 text-white"
    //               icon="DocumentArrowDownIcon:outline"
    //             />
    //             <span>PDF</span>
    //           </div>
    //           <Grid gutter={"sm"}>
    //             <Grid.Col span={12} md={2.5}>
    //               <div className="flex flex-col xs:flex-row md:flex-col gap-2 h-full">
    //                 <HomePlayerInfoCard />
    //                 <div className="note bg-white rounded-3xl w-full p-4 h-full">
    //                   <h2 className="text-lg font-normal text-perfGray1 pb-4">
    //                     Overall notes
    //                   </h2>
    //                   <p className=" text-base font-normal text-perfGray3">
    //                     Fitness Flexibility 10 Exercises to Improve Your
    //                     Flexibility 1. Standing Quad Stretch. Stand with your
    //                     feet together. ... 2. Standing Side Stretch
    //                   </p>
    //                 </div>
    //               </div>
    //             </Grid.Col>

    //             {/* Right Column Attendance Charts And numbers */}
    //             <Grid.Col span={12} md={9.5}>
    //               <Grid gutter={"sm"}>
    //                 <Grid.Col span={12}>
    //                   <AttendancesSmallCards />
    //                 </Grid.Col>
    //                 {/* Attedance Summary Table */}
    //                 <Grid.Col span={12} sm={8}>
    //                   <div className="bg-white h-full rounded-3xl p-4">
    //                     <AttendanceTable />
    //                   </div>
    //                 </Grid.Col>

    //                 <Grid.Col span={12} sm={4}>
    //                   <div className="flex flex-col gap-4">
    //                     {/* Total Attendace Pie Chart  */}
    //                     <div className="bg-white rounded-3xl">
    //                       <TotalAttendance />
    //                     </div>

    //                     {/* Attendance Calender */}
    //                     <CustomCalendar pageName="reports" />
    //                   </div>
    //                 </Grid.Col>
    //               </Grid>
    //             </Grid.Col>
    //           </Grid>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>
    <></>
  );
};

export default Detailed;
