import { memo, useEffect, useState } from "react";
import { Table, Checkbox, Avatar, Skeleton, Loader } from "@mantine/core";
import {
  useCoachUpdateAttendanceMutation,
  useGetTeamAttendanceQuery,
  useTeamAttendanceDaysQuery,
} from "~/app/store/coach/coachApi";
import { useSelector } from "react-redux";
import { selectedPlayerTeamFn } from "~/app/store/parent/parentSlice";
import NoTeamComp from "~/@main/components/NoTeamComp";
import NoAttendancesYet from "~/@main/components/NoAttendancesYet";
import { useUserQuery } from "~/app/store/user/userApi";
import {
  useSuperGetTeamAttendanceQuery,
  useSuperTeamAttendanceDaysQuery,
  useSuperUpdateAttendanceMutation,
} from "~/app/store/supervisor/supervisorMainApi";
import {
  CoachTeamAttendance,
  TeamAttendanceDays,
} from "~/app/store/types/coach-types";
import { useNavigate } from "react-router-dom";
import { Player } from "~/app/store/types/parent-types";

type Props = {};

const AttendanceTable = (props: Props) => {
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);
  console.log("selectedPlayerTeam", selectedPlayerTeam);
  const { data: user } = useUserQuery({});
  const [teamAttendance, setTeamAttendance] = useState<CoachTeamAttendance>();
  const [teamAttendanceDays, setTeamAttendanceDays] =
    useState<TeamAttendanceDays>();

  const { data: coachTeamAttendance } = useGetTeamAttendanceQuery(
    { team_id: selectedPlayerTeam?.id },
    {
      skip: !selectedPlayerTeam,
    }
  );

  const { data: superTeamAttendance } = useSuperGetTeamAttendanceQuery(
    { team_id: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam || user?.user_type !== "Supervisor" }
  );

  const { data: coachTeamAttendanceDays, isLoading: isCoachLoading } =
    useTeamAttendanceDaysQuery(
      { team_id: selectedPlayerTeam?.id },
      {
        skip: !selectedPlayerTeam,
      }
    );

  const { data: superTeamAttendanceDays, isLoading: isSuperLoading } =
    useSuperTeamAttendanceDaysQuery(
      { team_id: selectedPlayerTeam?.id },
      { skip: !selectedPlayerTeam || user?.user_type !== "Supervisor" }
    );

  useEffect(() => {
    console.log("superTeamAttendance", superTeamAttendance);
    console.log("superTeamAttendanceDays", superTeamAttendanceDays);
    if (coachTeamAttendance) setTeamAttendance(coachTeamAttendance);
    if (superTeamAttendance) setTeamAttendance(superTeamAttendance);
    if (coachTeamAttendanceDays) setTeamAttendanceDays(coachTeamAttendanceDays);
    if (superTeamAttendanceDays) setTeamAttendanceDays(superTeamAttendanceDays);
  }, [
    coachTeamAttendance,
    superTeamAttendance,
    coachTeamAttendanceDays,
    superTeamAttendanceDays,
  ]);

  return (
    <>
      {selectedPlayerTeam ? (
        <div className="tableWrapper overflow-scroll relative m-6 bg-white rounded-lg text-center">
          <CreateContentTable
            teamAttendance={teamAttendance}
            teamAttendanceDays={teamAttendanceDays}
          />
        </div>
      ) : (
        <NoTeamComp />
      )}
    </>
  );
};
export default memo(AttendanceTable);

const TestCheckbox = memo(({ theDate, thisDate, theStatus, theID }: any) => {
  const { data: user } = useUserQuery({});
  const [updateAttend, { isLoading: isUpdating }] =
    useCoachUpdateAttendanceMutation();
  const [superUpdateAttend, { isLoading: superUpdating }] =
    useSuperUpdateAttendanceMutation();

  return (
    <>
      {isUpdating || superUpdating ? (
        <div className=" mx-auto flex items-center justify-center">
          <Loader size={"sm"} />
        </div>
      ) : (
        <Checkbox
          disabled={
            (theDate === thisDate && theStatus === "UPCOMING") || isUpdating
          }
          checked={theStatus === "ATTENDED"}
          onChange={(e) => {
            //@ts-ignore
            if (["Coach", "SubCoach"].includes(user?.user_type)) {
              updateAttend({
                id: theID,
                status: theStatus !== "ATTENDED" ? "ATTENDED" : "ABSENT",
              });
            } else if (user?.user_type === "Supervisor") {
              superUpdateAttend({
                id: theID,
                status: theStatus !== "ATTENDED" ? "ATTENDED" : "ABSENT",
              });
            }
          }}
        />
      )}
    </>
  );
});

// srparate the code for performance
const CreateContentTable = memo(
  ({ teamAttendance, teamAttendanceDays }: any) => {
    const { data: user } = useUserQuery({});
    return (
      <Table
        withBorder
        highlightOnHover
        verticalSpacing={"sm"}
        horizontalSpacing={30}
      >
        <TableHead teamAttendance={teamAttendance} />
        {teamAttendanceDays?.results &&
        teamAttendanceDays?.results.length > 0 ? (
          <tbody className="overflow-scroll">
            {teamAttendanceDays?.results.map((item: any) => {
              const thisDate = item.day;
              return (
                <tr key={item.day} className="">
                  <td className="text-xs font-medium text-left px-0 sticky left-0 bg-white z-10 text-perfGray1">
                    <p className="ml-5">{thisDate}</p>
                    {/* {thisDate.getDate() - 1}/ {thisDate.getMonth() + 1} /
                  {thisDate.getFullYear()} */}
                  </td>
                  {teamAttendance?.results.map((player: any) => {
                    let theDate = "";
                    let theStatus = "";
                    let theID = 0;
                    for (let i of player.player_attendance) {
                      if (i.day === thisDate) {
                        theDate = i.day;
                        theStatus = i.status;
                        theID = i.id;
                      }
                    }
                    return (
                      <td key={player.id}>
                        <TestCheckbox
                          theDate={theDate}
                          thisDate={thisDate}
                          theStatus={theStatus}
                          theID={theID}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        ) : (
          <tr className="w-full p-4 m-10 bg-white">
            <td colSpan={100} className="bg-pagesBg p-10 w-full">
              No attendance added for this Team in this month yet <br />
              {user?.user_type === "Supervisor" && (
                <span>
                  ,if you want to add attendance you can go to the team info
                  page
                  <br />
                  and add attendance to calendar
                </span>
              )}
            </td>
          </tr>
        )}
      </Table>
    );
  }
);

const TableHead = memo(({ teamAttendance }: any) => {
  const navigate = useNavigate();
  const { data: user } = useUserQuery({});

  const isNotSubCoach = user?.user_type !== "SubCoach";

  return (
    <thead>
      <tr className="">
        {teamAttendance?.results.length == 0 ? (
          <th
            className="w-full font-normal flex justify-center items-center p-4 text-center"
            colSpan={100}
          >
            No Players in this Team, <br />
            You can add players on the team info page first, and then add there
            attendance from here.
          </th>
        ) : (
          <th className="bg-white sticky  top-0 z-20 ">Day</th>
        )}

        {teamAttendance?.results.map((player: Player) => (
          <th
            key={player.id}
            className="bg-white sticky top-0 z-20 text-center "
          >
            <div className="flex  flex-col justify-center items-center">
              <Avatar
                onClick={() =>
                  isNotSubCoach && navigate(`/players/${player.id}`)
                }
                radius={"xl"}
                size="md"
                className={isNotSubCoach ? "cursor-pointer" : ""}
                src={player.icon}
              />
              <span>{player.name}</span>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
});
