import { useState, useEffect } from "react";
import TopBar from "./components/TopBar";
import AttendanceTable from "./components/AttendanceTable";
import PerformanceTable from "./components/PerformanceTable";
import TeamInfo from "./components/TeamInfo";
import { Button } from "@mantine/core";

type Props = {};

const CoachHome = (props: Props) => {
  const [checked, setChecked] =
    useState<"Attendance" | "Performance" | "Team info">("Attendance");

  return (
    <div className="coah-home">
      <div className="flex gap-4 my-4 mx-8">
        <TopBar checked={checked} setChecked={setChecked} />
        {/* <Button onClick={() => setChecked("Attendance")}>Attendances</Button>
        <Button onClick={() => setChecked("Performance")}>Performance</Button>
        <Button onClick={() => setChecked("Team info")}>Team info</Button> */}
      </div>

      <div className={checked !== "Attendance" ? "hidden" : "block"}>
        <AttendanceTable />
      </div>
      <div className={checked !== "Performance" ? "hidden" : "block"}>
        <PerformanceTable />
      </div>
      <div className={checked !== "Team info" ? "hidden" : "block"}>
        <TeamInfo />
      </div>
    </div>
  );
};

export default CoachHome;
