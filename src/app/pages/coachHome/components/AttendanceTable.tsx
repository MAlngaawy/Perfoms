import React, { memo } from "react";
import { Table, Checkbox, Avatar, Skeleton } from "@mantine/core";
import {
  useCoachUpdateAttendanceMutation,
  useGetTeamAttendanceQuery,
  useGetTeamPlayersQuery,
} from "~/app/store/coach/coachApi";
// import memo from "../../../layouts/layout/components/Navigation";
import { useSelector } from "react-redux";
import { selectedPlayerTeamFn } from "~/app/store/parent/parentSlice";
import TeamFilter from "~/@main/components/TeamFilter";
import { useUpdateAttendanceMutation } from "~/app/store/attendance/attendanceApi";
import { truncate } from "fs";

type Props = {};

const players = [
  {
    name: "mohammed Ali",
    avatar:
      "https://images.squarespace-cdn.com/content/v1/5c2efbc95417fc1b3d3040ad/1623735675824-LXS5FG198B0MLQCKQC0P/Modern+School+Photos.jpg",
    id: 1,
    attendances: [
      {
        status: "ATTENDED",
        date: "11/11/2022",
      },
      {
        status: "UPCOMING",
        date: "12/12/2022",
      },
      {
        status: "ABSENT",
        date: "10/10/2022",
      },
    ],
  },
  {
    name: "Ahmed Salah",
    avatar:
      "https://images.squarespace-cdn.com/content/v1/5c2efbc95417fc1b3d3040ad/1623728514460-NKFH3X6TIK8JXUESNRQD/Modern+School+Portraits+Perth.jpg",
    id: 2,
    attendances: [
      {
        status: "UPCOMING",
        date: "12/12/2022",
      },
      {
        status: "ATTENDED",
        date: "10/10/2022",
      },
      {
        status: "ABSENT",
        date: "11/11/2022",
      },
    ],
  },
  {
    name: "Ali JR",
    avatar:
      "https://images.squarespace-cdn.com/content/v1/5c2efbc95417fc1b3d3040ad/1623728514460-NKFH3X6TIK8JXUESNRQD/Modern+School+Portraits+Perth.jpg",
    id: 2,
    attendances: [
      {
        status: "UPCOMING",
        date: "12/12/2022",
      },
      {
        status: "ABSENT",
        date: "11/11/2022",
      },

      {
        status: "ABSENT",
        date: "10/10/2022",
      },
    ],
  },
];

const teamDates = ["10/10/2022", "11/11/2022", "12/12/2022"];

const AttendanceTable = (props: Props) => {
  // const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);

  // const { data: coahcTeamPlayers } = useGetTeamPlayersQuery(
  //   { team_id: selectedPlayerTeam?.id },
  //   { skip: !selectedPlayerTeam }
  // );

  // const { data: teamAttendance } = useGetTeamAttendanceQuery(
  //   { team_id: selectedPlayerTeam?.id },
  //   { skip: !selectedPlayerTeam }
  // );

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
                {players.map((attend) => (
                  <th className="bg-white sticky top-0 z-20 text-center ">
                    <div className="flex  flex-col justify-center items-center">
                      <Avatar radius={"xl"} size="md" src={attend.avatar} />
                      <span>{attend.name}</span>
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
                    {players.map((player) => {
                      let theDate = "";
                      let theStatus = "";
                      for (let i of player.attendances) {
                        if (i.date === item) {
                          theDate = i.date;
                          theStatus = i.status;
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
                                plaerId: player.id,
                                plaerName: player.name,
                                date: thisDate,
                                playerDate: theDate,
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
