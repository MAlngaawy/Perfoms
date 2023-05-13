import React, { useState } from "react";
import { Link } from "react-router-dom";
import TeamCard from "~/@main/components/ManagerComponents/SubComponents/TeamCard";
import SwitchButton from "~/@main/components/SwitchButton";
import TeamFilter from "~/@main/components/TeamFilter";
import { useSuperTeamsQuery } from "~/app/store/supervisor/supervisorMainApi";
import AttendanceTable from "../coachHome/components/AttendanceTable";
import PerformanceTable from "../coachHome/components/PerformanceTable";

type Props = {};

const ScoringPage = (props: Props) => {
  const [checked, setChecked] =
    useState<"Attendance" | "Performance">("Attendance");

  return (
    <div className="coach-home">
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
        </div>
        <TeamFilter />
      </div>

      <div className={checked !== "Attendance" ? "hidden" : "block"}>
        <AttendanceTable />
      </div>
      <div className={checked !== "Performance" ? "hidden" : "block"}>
        <PerformanceTable />
      </div>
    </div>
  );

  // const { data: teams } = useSuperTeamsQuery({});
  // console.log(teams);

  // return (
  //   <div className="flex gap-4 m-4">
  //     {teams?.results.map((team) => {
  //       return (
  //         <Link to={`${team.id}/scoring-tables`} key={team.id}>
  //           <TeamCard team={team} withoutEditsOptions={true} />
  //         </Link>
  //       );
  //     })}
  //   </div>
  // );
};

export default ScoringPage;
