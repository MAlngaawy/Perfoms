import React from "react";
import { useSelector } from "react-redux";
import TeamFilter from "~/@main/components/TeamFilter";
import { useCoachTeamInfoQuery } from "~/app/store/coach/coachApi";
import { selectedPlayerTeamFn } from "~/app/store/parent/parentSlice";
import AttendanceTable from "../coachHome/components/AttendanceTable";
import SessionsAttendanceTable from "../coachHome/components/SessionsAttendanceTable";
type Props = {};

const SubCoach = (props: Props) => {
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);

  const { data: coachTeamInfoData } = useCoachTeamInfoQuery(
    { team_id: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam }
  );
  return (
    <div>
      <div className="flex flex-col justify-center items-center w-full my-5 bg-pagesBg text-perfBlue text-lg">
        <h2 className="mx-4 text-center mb-2">
          here you can take players attendance
        </h2>
        <TeamFilter />
      </div>
      {coachTeamInfoData?.attend_per === "SESSION" ? (
        <SessionsAttendanceTable />
      ) : (
        <AttendanceTable />
      )}
    </div>
  );
};

export default SubCoach;
