import { useState, useEffect } from "react";
import AppRadioGroub from "../../../@main/components/AppRadioGroub";
import AttendanceTable from "./components/AttendanceTable";
import PerformanceTable from "./components/PerformanceTable";
import TeamInfo from "./components/TeamInfo";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import TeamFilter from "~/@main/components/TeamFilter";
import classNames from "classnames";

type Props = {};

const CoachHome = (props: Props) => {
  const [checked, setChecked] =
    useState<"Attendance" | "Performance" | "Team info">("Attendance");

  return (
    <div className="coah-home">
      <div className="flex items-center justify-between gap-4 my-4 mx-8">
        <div className="flex items-center flex-wrap gap-4">
          {/* <AppRadioGroub
            values={["Attendance", "Performance", "Team info"]}
            checked={checked}
            setChecked={setChecked}
          /> */}
          <button
            className={classNames(
              " text-xs sm:text-sm p-1 md:px-2 border border-perfBlue rounded-md ",
              {
                "text-white bg-perfBlue ": checked === "Attendance",
                "text-perfBlue hover:text-white hover:bg-perfBlue":
                  checked !== "Attendance",
              }
            )}
            onClick={() => setChecked("Attendance")}
          >
            Attendances
          </button>
          <button
            className={classNames(
              " text-xs sm:text-sm p-1 md:px-2 border border-perfBlue rounded-md ",
              {
                "text-white bg-perfBlue ": checked === "Performance",
                "text-perfBlue hover:text-white hover:bg-perfBlue":
                  checked !== "Performance",
              }
            )}
            onClick={() => setChecked("Performance")}
          >
            Performance
          </button>
          <button
            className={classNames(
              " text-xs sm:text-sm p-1 md:px-2 border border-perfBlue rounded-md ",
              {
                "text-white bg-perfBlue ": checked === "Team info",
                "text-perfBlue hover:text-white hover:bg-perfBlue":
                  checked !== "Team info",
              }
            )}
            onClick={() => setChecked("Team info")}
          >
            Team info
          </button>
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
