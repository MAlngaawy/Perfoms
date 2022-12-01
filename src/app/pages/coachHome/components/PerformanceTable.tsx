import React from "react";
import { Table, Checkbox, Avatar, Box } from "@mantine/core";
import cn from "classnames";
import { useGetTeamPerformancesQuery } from "~/app/store/coach/coachApi";
import { useSelector } from "react-redux";
import { selectedPlayerTeamFn } from "~/app/store/parent/parentSlice";

type Props = {};

const players = [
  {
    name: "mohammed Ali",
    avatar:
      "https://images.squarespace-cdn.com/content/v1/5c2efbc95417fc1b3d3040ad/1623735675824-LXS5FG198B0MLQCKQC0P/Modern+School+Photos.jpg",
    id: 1,
    scores: [
      {
        id: 9,
        score: 1,
        metric: "ATTACK",
      },
      {
        id: 8,
        score: 3,
        metric: "PUSH",
      },
      {
        id: 7,
        score: 5,
        metric: "BOXING",
      },
    ],
  },
  {
    name: "Ahmed Salah",
    avatar:
      "https://images.squarespace-cdn.com/content/v1/5c2efbc95417fc1b3d3040ad/1623728514460-NKFH3X6TIK8JXUESNRQD/Modern+School+Portraits+Perth.jpg",
    id: 2,
    scores: [
      {
        id: 6,
        score: 3,
        metric: "BOXING",
      },
      {
        id: 5,
        score: 4,
        metric: "PUSH",
      },
      {
        id: 4,
        score: 2,
        metric: "ATTACK",
      },
    ],
  },

  {
    name: "Ali JR",
    avatar:
      "https://images.squarespace-cdn.com/content/v1/5c2efbc95417fc1b3d3040ad/1623728514460-NKFH3X6TIK8JXUESNRQD/Modern+School+Portraits+Perth.jpg",
    id: 2,
    scores: [
      {
        id: 1,
        score: 2,
        metric: "PUSH",
      },
      {
        id: 2,
        score: 1,
        metric: "BOXING",
      },
      {
        id: 3,
        score: 2,
        metric: "ATTACK",
      },
    ],
  },
];

// Doesn't matters what the arrange
const metrics = [
  { name: "ATTACK", id: 2 },
  { name: "BOXING", id: 1 },
  { name: "PUSH", id: 3 },
];

const PerformanceTable = (props: Props) => {
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);
  const { data: teamPerformance } = useGetTeamPerformancesQuery(
    { team_id: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam }
  );

  return (
    <div className="overflow-scroll max-h-screen relative m-6 bg-white rounded-lg text-center">
      <Table highlightOnHover horizontalSpacing="xl">
        <thead>
          <tr className="">
            <th className="bg-white sticky  top-0 z-20 ">Day</th>
            {players.map((player) => (
              <th className="bg-white sticky top-0 z-20 text-center ">
                <div className="flex  flex-col justify-center items-center">
                  <Avatar radius={"xl"} size="md" src={player.avatar} />
                  <span>{player.name}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="overflow-scroll">
          {metrics.map((metric) => {
            return (
              <tr className="" key={metric.id}>
                <td className="text-sm w-48 sticky left-0 bg-white z-10 font-medium text-perfGray1">
                  {metric.name}
                </td>
                {players.map((player) => {
                  let theMetric = 0;
                  let theScore = 0;
                  for (let i of player.scores) {
                    if (i.metric === metric.name) {
                      theMetric = i.id || 0;
                      theScore = i.score || 0;
                    }
                  }

                  return (
                    <td key={metric.id}>
                      <div className="flex gap-2 justify-center items-center">
                        {[1, 2, 3, 4, 5].map((number) => (
                          <span
                            onClick={() =>
                              console.log({
                                metricID: theMetric,
                                metric: metric.id,
                                team_id: selectedPlayerTeam,
                                playerid: player.id,
                                playerName: player.name,
                                new_score: number,
                                max_score: 5,
                              })
                            }
                            className={cn(
                              "px-3 p-1   rounded-md cursor-pointer text-perfGray1 font-bold",
                              {
                                "bg-scoreGreen text-white":
                                  theScore > 3 && theScore === number,
                                "bg-scoreRed text-white":
                                  theScore < 3 && theScore === number,
                                "bg-scoreYallow text-white":
                                  theScore === 3 && theScore === number,
                                "bg-scoreGray": theScore !== number,
                              }
                            )}
                          >
                            {number}
                          </span>
                        ))}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
export default PerformanceTable;
