import React, { memo } from "react";
import { Table, Checkbox, Avatar, Skeleton } from "@mantine/core";
import {
  useCoachUpdateAttendanceMutation,
  useGetTeamAttendanceQuery,
} from "~/app/store/coach/coachApi";
import { useSelector } from "react-redux";
import { selectedPlayerTeamFn } from "~/app/store/parent/parentSlice";

const teamDates = ["2022-11-30", "2022-12-01", "2022-12-02", "2022-11-29"];

type Props = {};

const AttendanceTable = (props: Props) => {
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);

  const { data: teamAttendance } = useGetTeamAttendanceQuery(
    { team_id: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam }
  );

  console.log("teamAttendance", teamAttendance);

  const [updateAttend, { isLoading: isUpdating }] =
    useCoachUpdateAttendanceMutation();

  // console.log("coahcTeamPlayers", coahcTeamPlayers);

  return (
    <>
      {true ? (
        <div className="overflow-scroll max-h-screen relative m-6 bg-white rounded-lg text-center">
          {/* <TeamFilter /> */}
          <Table highlightOnHover horizontalSpacing="xl">
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
              {teamDates.map((item) => {
                const thisDate = item;
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
                        if (i.day === item) {
                          theDate = i.day;
                          theStatus = i.status;
                          theID = i.id;
                        }
                      }
                      return (
                        <td>
                          <Checkbox
                            disabled={
                              theDate === item && theStatus === "UPCOMING"
                            }
                            checked={theStatus === "ATTENDED"}
                            onChange={(e) => {
                              // updateAttend({
                              //   id: attend.id,
                              //   status:
                              //     attend.status !== "ATTENDED"
                              //       ? "ATTENDED"
                              //       : "ABSENT",
                              // });
                              console.log({
                                attended: `becomes ${
                                  e.currentTarget.checked
                                    ? "ATTENDED"
                                    : "ABSENT"
                                }`,
                                plaerId: theID,
                              });
                            }}
                          />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      ) : (
        <Skeleton height="100%" width="100%" radius="lg" />
      )}
    </>
  );
};
export default memo(AttendanceTable);
