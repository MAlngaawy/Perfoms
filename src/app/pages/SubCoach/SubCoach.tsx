import React from "react";
import TeamFilter from "~/@main/components/TeamFilter";
import AttendanceTable from "../coachHome/components/AttendanceTable";
type Props = {};

const SubCoach = (props: Props) => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center w-full my-5 bg-pagesBg text-perfBlue text-lg">
        <h2 className="mx-4 text-center mb-2">
          here you can take players attendance
        </h2>
        <TeamFilter />
      </div>

      <AttendanceTable />
    </div>
  );
};

export default SubCoach;
