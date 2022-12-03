import { useState, useEffect } from "react";
import AppRadioGroub from "../../../@main/components/AppRadioGroub";
import AttendanceTable from "./components/AttendanceTable";
import PerformanceTable from "./components/PerformanceTable";
import TeamInfo from "./components/TeamInfo";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import TeamFilter from "~/@main/components/TeamFilter";
import classNames from "classnames";
import SwitchButton from "~/@main/components/SwitchButton";

type Props = {};

const CoachHome = (props: Props) => {
  const [checked, setChecked] =
    useState<"Attendance" | "Performance" | "Team info">("Attendance");

  return (
    <div className="coah-home">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 my-4 mx-8">
        <div className="flex items-center flex-wrap gap-1 xs:gap-4">
          {/* <AppRadioGroub
            values={["Attendance", "Performance", "Team info"]}
            checked={checked}
            setChecked={setChecked}
          /> */}
          <SwitchButton
            checked={checked}
            setChecked={setChecked}
            type={"Attendance"}
          />
          <SwitchButton
            checked={checked}
            setChecked={setChecked}
            type={"Performance"}
          />
          <SwitchButton
            checked={checked}
            setChecked={setChecked}
            type={"Team info"}
          />

          <button className="bg-perfBlue text-white text-xs py-2 px-10 rounded-3xl">
            <Link to="/certificate">Certificate</Link>
          </button>
        </div>
        <TeamFilter />
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
