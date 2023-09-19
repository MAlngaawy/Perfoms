import { memo, useEffect, useState } from "react";
import { Table, Checkbox, Avatar, Loader } from "@mantine/core";
import {
  useCoachUpdateAttendanceSessionMutation,
  useGetTeamAttendanceQuery,
  useTeamAttendanceDaysQuery,
} from "~/app/store/coach/coachApi";
import { useSelector } from "react-redux";
import { selectedPlayerTeamFn } from "~/app/store/parent/parentSlice";
import NoTeamComp from "~/@main/components/NoTeamComp";
import { useUserQuery } from "~/app/store/user/userApi";
import {
  useSuperGetTeamAttendanceQuery,
  useSuperTeamAttendanceDaysQuery,
  useSuperUpdateAttendanceSessionMutation,
} from "~/app/store/supervisor/supervisorMainApi";
import {
  CoachTeamAttendance,
  TeamAttendanceDays,
} from "~/app/store/types/coach-types";
import { useNavigate } from "react-router-dom";
import { Player } from "~/app/store/types/parent-types";
import { AttendanceDay } from "~/app/store/types/supervisor-types";
import AppUtils from "~/@main/utils/AppUtils";

type Props = {};

const AttendanceTable = (props: Props) => {
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);
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

// srparate the code for performance
const CreateContentTable = memo(
  ({ teamAttendance, teamAttendanceDays }: any) => {
    return (
      <Table highlightOnHover verticalSpacing={"sm"} horizontalSpacing={30}>
        <TableHead teamAttendance={teamAttendance} />
        {teamAttendanceDays?.results &&
        teamAttendanceDays?.results.length > 0 ? (
          <tbody className="overflow-scroll">
            {teamAttendanceDays?.results.map((item: AttendanceDay) => {
              return (
                <>
                  {item.attendance_sessions.length > 0 && (
                    <tr className="">
                      <td className="border-0 px-0 pl-1 font-light text-left text-xs sticky left-0 bg-white z-10 text-perfGray1">
                        {item.day}
                      </td>
                    </tr>
                  )}

                  {item.attendance_sessions.map((session) => (
                    <tr key={session.id} className="">
                      <td className="text-xs tracking-wider font-medium text-center px-0 sticky left-0 bg-white z-10 text-perfGray1">
                        {AppUtils.formatTime(session.from_hour)}
                        <br />
                        {AppUtils.formatTime(session.to_hour)}
                      </td>
                      {teamAttendance?.results.map((player: any) => {
                        let from = "";
                        let to = "";
                        let sessionId = 0;
                        let sessionStatus = "";

                        for (let i of player.player_attendance) {
                          console.log("iiiiiii", i);
                          for (let playerSession of i.attendance_sessions) {
                            if (
                              playerSession.from_hour === session.from_hour &&
                              playerSession.to_hour === session.to_hour &&
                              i.day === item.day
                            ) {
                              from = playerSession.from_hour;
                              to = playerSession.to_hour;
                              sessionId = playerSession.id;
                              sessionStatus = playerSession.status;
                            }
                          }
                        }
                        return (
                          <td key={player.id}>
                            <TestCheckbox
                              theStatus={sessionStatus}
                              theID={sessionId}
                            />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </>
              );
            })}
          </tbody>
        ) : (
          <tr className="w-full p-4 m-10 bg-white">
            <td colSpan={100} className="bg-pagesBg p-10 w-full">
              No attendance added for this Team in this month yet, <br />
              if you want to add attendance you can go to the team info page
              <br />
              and add attendance to calendar
            </td>
          </tr>
        )}
      </Table>
    );
  }
);

const TestCheckbox = memo(({ theStatus, theID }: any) => {
  console.log("theStatus", theStatus);

  const { data: user } = useUserQuery({});
  const [updateAttend, { isLoading: isUpdating }] =
    useCoachUpdateAttendanceSessionMutation();
  const [superUpdateAttend, { isLoading: superUpdating }] =
    useSuperUpdateAttendanceSessionMutation();

  return (
    <>
      {isUpdating || superUpdating ? (
        <div className=" mx-auto flex items-center justify-center">
          <Loader size={"sm"} />
        </div>
      ) : (
        <Checkbox
          disabled={theStatus === "UPCOMING"}
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
