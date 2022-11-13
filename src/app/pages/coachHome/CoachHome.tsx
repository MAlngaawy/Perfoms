import { useState, useEffect } from "react";
import TopBar from "./components/TopBar";
import AttendanceTable from "./components/AttendanceTable";
import PerformanceTable from "./components/PerformanceTable";
import TeamInfo from "./components/TeamInfo";

type Props = {};

const CoachHome = (props: Props) => {
  const [checked, setChecked] =
    useState<"Attendance" | "Performance" | "Team info">("Attendance");

  useEffect(() => {
    console.log(checked);
  }, [checked]);

  return (
    <div className="coah-home">
      <div className="flex gap-4">
        <TopBar checked={checked} setChecked={setChecked} />
      </div>
      {checked === "Attendance" && <AttendanceTable />}
      {checked === "Performance" && <PerformanceTable />}
      {checked === "Team info" && <TeamInfo />}
    </div>
  );
};

export default CoachHome;
