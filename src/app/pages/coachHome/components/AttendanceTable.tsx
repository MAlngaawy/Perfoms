import React, { memo } from "react";
import { Table, Checkbox, Avatar, Skeleton } from "@mantine/core";
import {
  useCoachUpdateAttendanceMutation,
  useGetTeamAttendanceQuery,
  useTeamAttendanceDaysQuery,
} from "~/app/store/coach/coachApi";
import { useSelector } from "react-redux";
import { selectedPlayerTeamFn } from "~/app/store/parent/parentSlice";
import NoTeamComp from "~/@main/components/NoTeamComp";
import NoAttendancesYet from "~/@main/components/NoAttendancesYet";

type Props = {};

const AttendanceTable = (props: Props) => {
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);

  const { data: teamAttendance } = useGetTeamAttendanceQuery(
    { team_id: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam }
  );

  console.log("teamAttendance", teamAttendance);

  const { data: teamAttendanceDays, isLoading } = useTeamAttendanceDaysQuery(
    { team_id: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam }
  );

  const [updateAttend, { isLoading: isUpdating }] =
    useCoachUpdateAttendanceMutation();

  // console.log("coahcTeamPlayers", coahcTeamPlayers);

  if (isLoading)
    return (
      <Skeleton
        height={200}
        width="80%"
        className="mx-auto my-20"
        radius="lg"
      />
    );

  return (
    <>
      {selectedPlayerTeam ? (
        <div className="tableWrapper overflow-scroll relative m-6 bg-white rounded-lg text-center">
          <Table
            withBorder
            highlightOnHover
            verticalSpacing={"sm"}
            horizontalSpacing={30}
          >
            <thead>
              <tr className="">
                <th className="bg-white sticky  top-0 z-20 ">Day</th>
                {teamAttendance?.results.map((player) => (
                  <th className="bg-white sticky top-0 z-20 text-center ">
                    <div className="flex  flex-col justify-center items-center">
                      <Avatar radius={"xl"} size="md" src={player.icon} />
                      <span>{player.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="overflow-scroll">
              {teamAttendanceDays?.player_attendance &&
              teamAttendanceDays?.player_attendance.length > 0 ? (
                <>
                  {teamAttendanceDays?.player_attendance.map((item) => {
                    const thisDate = item.day;
                    return (
                      <tr className="">
                        <td className="text-xs font-medium text-center px-0 sticky left-0 bg-white z-10 text-perfGray1">
                          {thisDate}
                          {/* {thisDate.getDate() - 1}/ {thisDate.getMonth() + 1} /
                          {thisDate.getFullYear()} */}
                        </td>
                        {teamAttendance?.results.map((player) => {
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
                            <td>
                              <Checkbox
                                disabled={
                                  (theDate === thisDate &&
                                    theStatus === "UPCOMING") ||
                                  isUpdating
                                }
                                checked={theStatus === "ATTENDED"}
                                onChange={(e) => {
                                  updateAttend({
                                    id: theID,
                                    status:
                                      theStatus !== "ATTENDED"
                                        ? "ATTENDED"
                                        : "ABSENT",
                                  });
                                  console.log({
                                    attended: `becomes ${
                                      e.currentTarget.checked
                                        ? "ATTENDED"
                                        : "ABSENT"
                                    }`,
                                    statusId: theID,
                                  });
                                }}
                              />
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </>
              ) : (
                <tr>
                  <td>
                    <NoAttendancesYet />
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      ) : (
        <NoTeamComp />
      )}
    </>
  );
};
export default memo(AttendanceTable);
