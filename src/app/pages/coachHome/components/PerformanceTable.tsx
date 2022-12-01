import React from "react";
import { Table, Checkbox, Avatar, Box } from "@mantine/core";
import cn from "classnames";
import { useGetTeamPerformancesQuery } from "~/app/store/coach/coachApi";
import { useSelector } from "react-redux";
import { selectedPlayerTeamFn } from "~/app/store/parent/parentSlice";

type Props = {};

const players = [
  {
    name: "Mohamed Ahmed",
    avatar:
      "https://images.squarespace-cdn.com/content/v1/5c2efbc95417fc1b3d3040ad/1623735675824-LXS5FG198B0MLQCKQC0P/Modern+School+Photos.jpg",
    id: 1,
    score: 5,
  },
  {
    name: "Mohamed Ahmed",
    avatar:
      "https://images.squarespace-cdn.com/content/v1/5c2efbc95417fc1b3d3040ad/1623735675824-LXS5FG198B0MLQCKQC0P/Modern+School+Photos.jpg",
    id: 1,
    score: 3,
  },
  {
    name: "Mohamed Ahmed",
    avatar:
      "https://images.squarespace-cdn.com/content/v1/5c2efbc95417fc1b3d3040ad/1623735675824-LXS5FG198B0MLQCKQC0P/Modern+School+Photos.jpg",
    id: 1,
    score: 1,
  },

  {
    name: "Mohamed Ahmed",
    avatar:
      "https://images.squarespace-cdn.com/content/v1/5c2efbc95417fc1b3d3040ad/1623735675824-LXS5FG198B0MLQCKQC0P/Modern+School+Photos.jpg",
    id: 1,
    score: 4,
  },
  {
    name: "Mohamed Ahmed",
    avatar:
      "https://images.squarespace-cdn.com/content/v1/5c2efbc95417fc1b3d3040ad/1623735675824-LXS5FG198B0MLQCKQC0P/Modern+School+Photos.jpg",
    id: 1,
    score: 2,
  },
  {
    name: "Mohamed Ahmed",
    avatar:
      "https://images.squarespace-cdn.com/content/v1/5c2efbc95417fc1b3d3040ad/1623735675824-LXS5FG198B0MLQCKQC0P/Modern+School+Photos.jpg",
    id: 1,
    score: 3,
  },
  {
    name: "Mohamed Ahmed",
    avatar:
      "https://images.squarespace-cdn.com/content/v1/5c2efbc95417fc1b3d3040ad/1623735675824-LXS5FG198B0MLQCKQC0P/Modern+School+Photos.jpg",
    id: 1,
    score: 1,
  },
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
            {teamPerformance?.results.map((item) => (
              <th className="bg-white sticky top-0 z-20 text-center ">
                <div className="flex  flex-col justify-center items-center">
                  <Avatar
                    radius={"xl"}
                    size="md"
                    src={item.player_kpi.player.icon}
                  />
                  <span>{item.player_kpi.player.name}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="overflow-scroll">
          {teamPerformance?.results.map((item) => {
            return (
              <tr className="" key={item.id}>
                <td className="text-sm w-48 sticky left-0 bg-white z-10 text-perfGray2">
                  {item.metric.name}
                </td>
                {teamPerformance?.results.map((item) => (
                  <td key={item.id}>
                    <div className="flex gap-2 justify-center items-center">
                      {[1, 2, 3, 4, 5].map((number) => (
                        <span
                          onClick={() =>
                            console.log({
                              id: item.id,
                              team_id: selectedPlayerTeam,
                              playerName: item.player_kpi.player.name,
                              score: number,
                              max_score: item.max_score,
                            })
                          }
                          className={cn(
                            "px-3 p-1 bg-perfLigtGray rounded-md cursor-pointer",
                            {
                              "bg-green text-white":
                                item.score > 3 && item.score === number,
                              "bg-red text-white":
                                item.score < 3 && item.score === number,
                              "bg-yellow text-white":
                                item.score === 3 && item.score === number,
                            }
                          )}
                        >
                          {number}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
export default PerformanceTable;
