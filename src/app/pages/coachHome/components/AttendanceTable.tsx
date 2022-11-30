import React, { memo } from "react";
import { Table, Checkbox, Avatar } from "@mantine/core";
import { useGetTeamPlayersQuery } from "~/app/store/coach/coachApi";
// import memo from "../../../layouts/layout/components/Navigation";
import { useSelector } from "react-redux";
import { selectedPlayerTeamFn } from "~/app/store/parent/parentSlice";
import TeamFilter from "~/@main/components/TeamFilter";

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

  console.log("coahcTeamPlayers", coahcTeamPlayers);

  return (
    <>
      {selectedPlayerTeam && coahcTeamPlayers ? (
        <div className="overflow-scroll max-h-screen relative m-6 bg-white rounded-lg text-center">
          {/* <TeamFilter /> */}
          <Table highlightOnHover horizontalSpacing="xl">
            <thead>
              <tr className="">
                <th className="bg-white sticky  top-0 z-20 ">Day</th>
                {coahcTeamPlayers?.results.map((player) => (
                  <th
                    key={player.id}
                    className="bg-white sticky top-0 z-20 text-center "
                  >
                    <div className="flex  flex-col justify-center items-center">
                      <Avatar radius={"xl"} size="md" src={player.icon} />
                      <span>{player.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="overflow-scroll">
              {new Array(30).fill(5).map((item, idx) => {
                const thisDate = new Date(`${item}/${idx + 1}/2022`);
                return (
                  <tr className="" key={idx}>
                    <td className="text-xs font-semibold w-36 text-center sticky left-0 bg-white z-10 text-perfGray2 px-1">
                      {thisDate.getDate() - 1}/ {thisDate.getMonth() + 1} /
                      {thisDate.getFullYear()}
                    </td>
                    {coahcTeamPlayers?.results.map((player, index) => {
                      console.log("1231321231");
                      return (
                        <td key={player.id}>
                          <Checkbox
                            onChange={(e) => {
                              console.log({
                                attended: e.currentTarget.checked,
                                plaerId: player.id,
                                plaerName: player.name,
                                date: new Date(`${item}/${idx}/2022`),
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
        "Loading"
      )}
    </>
  );
};
export default memo(AttendanceTable);
