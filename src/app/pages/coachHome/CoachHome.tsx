import { useState, lazy, Suspense } from "react";
import { Button, Skeleton } from "@mantine/core";
import { Link } from "react-router-dom";
import TeamFilter from "~/@main/components/TeamFilter";
import SwitchButton from "~/@main/components/SwitchButton";
import { useCoachTeamInfoQuery } from "~/app/store/coach/coachApi";
import { useSelector } from "react-redux";
import { selectedPlayerTeamFn } from "~/app/store/parent/parentSlice";

const LazyAttendanceTable = lazy(() => import("./components/AttendanceTable"));
const LazySessionsAttendanceTable = lazy(
  () => import("./components/SessionsAttendanceTable")
);
const LazyPerformanceTable = lazy(
  () => import("./components/PerformanceTable")
);
const LazyTeamInfo = lazy(() => import("./components/TeamInfo"));

type Props = {};

const CoachHome = (props: Props) => {
  const [checked, setChecked] =
    useState<"Attendance" | "Performance" | "Team info">("Attendance");
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);

  const { data: coachTeamInfoData } = useCoachTeamInfoQuery(
    { team_id: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam }
  );
  console.log("coachTeamInfoData", coachTeamInfoData);

  const renderTable = () => {
    switch (checked) {
      case "Attendance":
        return (
          <Suspense fallback={<SkelatonComponent />}>
            {coachTeamInfoData?.attend_per === "SESSION" ? (
              <LazySessionsAttendanceTable />
            ) : (
              <LazyAttendanceTable />
            )}
          </Suspense>
        );
      case "Performance":
        return <LazyPerformanceTable />;
      case "Team info":
        return (
          <Suspense fallback={<SkelatonComponent />}>
            <LazyTeamInfo />
          </Suspense>
        );
      default:
        return null;
    }
  };

  return (
    <div className="coach-home">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 m-4 ">
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
          <SwitchButton
            checked={checked}
            setChecked={setChecked}
            type={"Team info"}
          />
          <Button
            className="border text-perfBlue border-perfBlue hover:text-white bg-transparent hover:bg-perfBlue text-xs sm:text-sm p-1 md:px-2 rounded-xl "
            component={Link}
            to="/certificate"
          >
            Certificate
          </Button>
        </div>
        <TeamFilter />
      </div>

      {renderTable()}
    </div>
  );
};

export default CoachHome;

const SkelatonComponent = () => {
  return (
    <>
      <Skeleton height={100} width="95%" className="mx-auto mb-2" radius="lg" />
      <Skeleton height={"70vh"} width="95%" className="mx-auto" radius="lg" />
    </>
  );
};
