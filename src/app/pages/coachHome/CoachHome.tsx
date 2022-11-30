import { useState, useEffect } from "react";
import AppRadioGroub from "../../../@main/components/AppRadioGroub";
import AttendanceTable from "./components/AttendanceTable";
import PerformanceTable from "./components/PerformanceTable";
import TeamInfo from "./components/TeamInfo";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import TeamFilter from "~/@main/components/TeamFilter";

type Props = {};

const CoachHome = (props: Props) => {
  const [checked, setChecked] =
    useState<"Attendance" | "Performance" | "Team info">("Attendance");

  return (
    <div className="coah-home">
      <TeamFilter />
      <div className="flex items-center flex-wrap gap-4 my-4 mx-8">
        <AppRadioGroub
          values={["Attendance", "Performance", "Team info"]}
          checked={checked}
          setChecked={setChecked}
        />
        {/* <Button onClick={() => setChecked("Attendance")}>Attendances</Button>
        <Button onClick={() => setChecked("Performance")}>Performance</Button>
        <Button onClick={() => setChecked("Team info")}>Team info</Button> */}
        <button className="bg-perfBlue text-white text-xs py-2 px-10 rounded-3xl">
          <Link to="/certificate">Certificate</Link>
        </button>
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
