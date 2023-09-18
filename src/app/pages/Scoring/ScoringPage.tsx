import { useState } from "react";
import { useSelector } from "react-redux";
import SwitchButton from "~/@main/components/SwitchButton";
import TeamFilter from "~/@main/components/TeamFilter";
import { selectedPlayerTeamFn } from "~/app/store/parent/parentSlice";
import { useSuperTeamInfoQuery } from "~/app/store/supervisor/supervisorMainApi";
import AttendanceTable from "../coachHome/components/AttendanceTable";
import PerformanceTable from "../coachHome/components/PerformanceTable";
import SessionsAttendanceTable from "../coachHome/components/SessionsAttendanceTable";
import TimeFilter from "~/@main/components/TimeFilter";

type Props = {};

const ScoringPage = (props: Props) => {
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);

  const [checked, setChecked] =
    useState<"Attendance" | "Performance">("Attendance");
  const { data: superTeam } = useSuperTeamInfoQuery(
    { team_id: JSON.stringify(selectedPlayerTeam?.id) },
    { skip: !selectedPlayerTeam }
  );

  return (
    <div className="coach-home">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 my-4 mx-8">
        <div className="flex items-center flex-wrap gap-1 xs:gap-4">
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
        </div>
        <div className="flex flex-col xs:flex-row gap-2">
          {checked === "Attendance" && <TimeFilter />}
          <TeamFilter />
        </div>
      </div>

      <div className={checked !== "Attendance" ? "hidden" : "block"}>
        {superTeam?.attend_per === "SESSION" ? (
          <SessionsAttendanceTable />
        ) : (
          <AttendanceTable />
        )}
      </div>
      <div className={checked !== "Performance" ? "hidden" : "block"}>
        <PerformanceTable />
      </div>
    </div>
  );
};

export default ScoringPage;
