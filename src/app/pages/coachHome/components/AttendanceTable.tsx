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

type Props = {};

const players = [
  {
    name: "mohammed Ali",
    avatar:
      "https://images.squarespace-cdn.com/content/v1/5c2efbc95417fc1b3d3040ad/1623735675824-LXS5FG198B0MLQCKQC0P/Modern+School+Photos.jpg",
    id: 1,
  },
  {
    name: "Ahmed Salah",
    avatar:
      "https://images.squarespace-cdn.com/content/v1/5c2efbc95417fc1b3d3040ad/1623728514460-NKFH3X6TIK8JXUESNRQD/Modern+School+Portraits+Perth.jpg",
    id: 2,
  },
  {
    name: "Kareem Momen",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjh6VSzXG8EgTqDjm0JJ7CTlDVFnIHh6X9dPgBDqxt2kUOGgH7NQy0Ey6oPhEn5TVQbvI&usqp=CAU",
    id: 3,
  },
  {
    name: "Khaled Momen",
    avatar:
      "https://www.anthropics.com/portraitpro/img/page-images/homepage/v22/what-can-it-do-5B.jpg",
    id: 3,
  },
  {
    name: "mohammed Ali",
    avatar:
      "https://images.squarespace-cdn.com/content/v1/5c2efbc95417fc1b3d3040ad/1623735675824-LXS5FG198B0MLQCKQC0P/Modern+School+Photos.jpg",
    id: 1,
  },
  {
    name: "Ahmed Salah",
    avatar:
      "https://images.squarespace-cdn.com/content/v1/5c2efbc95417fc1b3d3040ad/1623728514460-NKFH3X6TIK8JXUESNRQD/Modern+School+Portraits+Perth.jpg",
    id: 2,
  },
  {
    name: "Kareem Momen",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjh6VSzXG8EgTqDjm0JJ7CTlDVFnIHh6X9dPgBDqxt2kUOGgH7NQy0Ey6oPhEn5TVQbvI&usqp=CAU",
    id: 3,
  },
  {
    name: "Khaled Momen",
    avatar:
      "https://www.anthropics.com/portraitpro/img/page-images/homepage/v22/what-can-it-do-5B.jpg",
    id: 3,
  },
  {
    name: "mohammed Ali",
    avatar:
      "https://images.squarespace-cdn.com/content/v1/5c2efbc95417fc1b3d3040ad/1623735675824-LXS5FG198B0MLQCKQC0P/Modern+School+Photos.jpg",
    id: 1,
  },
];

const AttendanceTable = (props: Props) => {
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);

  const { data: coahcTeamPlayers } = useGetTeamPlayersQuery(
    { team_id: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam }
  );

  const { data: teamAttendance } = useGetTeamAttendanceQuery(
    { team_id: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam }
  );

  const [updateAttend, { isLoading: isUpdating }] =
    useCoachUpdateAttendanceMutation();

  console.log("coahcTeamPlayers", coahcTeamPlayers);

  return (
    <>
      {selectedPlayerTeam && teamAttendance ? (
        <div className="overflow-scroll max-h-screen relative m-6 bg-white rounded-lg text-center">
          {/* <TeamFilter /> */}
          <Table highlightOnHover horizontalSpacing="xl">
            <thead>
              <tr className="">
                <th className="bg-white sticky  top-0 z-20 ">Day</th>
                {teamAttendance?.results.map((attend) => (
                  <th
                    key={attend.id}
                    className="bg-white sticky top-0 z-20 text-center "
                  >
                    <div className="flex  flex-col justify-center items-center">
                      <Avatar
                        radius={"xl"}
                        size="md"
                        src={attend.player.icon}
                      />
                      <span>{attend.player.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="overflow-scroll">
              {teamAttendance.results.map((item) => {
                const thisDate = new Date(item.day);
                return (
                  <tr className="" key={item.id}>
                    <td className="text-xs font-semibold text-center px-0 sticky left-0 bg-white z-10 text-perfGray3">
                      {thisDate.getDate() - 1}/ {thisDate.getMonth() + 1} /
                      {thisDate.getFullYear()}
                    </td>
                    {teamAttendance?.results.map((attend, index) => {
                      return (
                        <td key={attend.id}>
                          <Checkbox
                            disabled={attend.status === "UPCOMING"}
                            checked={attend.status === "ATTENDED"}
                            onChange={(e) => {
                              updateAttend({
                                id: attend.id,
                                status:
                                  attend.status !== "ATTENDED"
                                    ? "ATTENDED"
                                    : "ABSENT",
                              });
                              console.log({
                                attended: `becomes ${
                                  e.currentTarget.checked
                                    ? "ATTENDED"
                                    : "ABSENT"
                                }`,
                                plaerId: attend.id,
                                plaerName: attend.player.name,
                                date: new Date(attend.day),
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
