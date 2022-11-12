import React, { useState, useEffect } from "react";
import { Radio } from "@mantine/core";
import TopBar from "./components/TopBar";
import AttendanceTable from "./components/AttendanceTable";
import PerformanceTable from "./components/PerformanceTable";

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
    </div>
  );
};

export default CoachHome;
