import React from "react";
import { Table, Checkbox, Avatar, Box } from "@mantine/core";
import cn from "classnames";

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
          {new Array(30).fill("Push").map((item, idx) => {
            const thisDate = new Date(`${item}/${idx + 1}/2022`);
            return (
              <tr className="">
                <td className="text-sm w-48 sticky left-0 bg-white z-10 text-perfGray2">
                  {item}
                </td>
                {players.map((player, index) => (
                  <>
                    <td>
                      <div className="flex gap-2 justify-center items-center">
                        {[1, 2, 3, 4, 5].map((number) => (
                          <span
                            onClick={() =>
                              console.log({
                                playerId: player.id,
                                playerName: player.name,
                                metric: item,
                              })
                            }
                            className={cn(
                              "px-3 p-1 bg-perfLigtGray rounded-md cursor-pointer",
                              {
                                "bg-green text-white":
                                  player.score > 3 && player.score === number,
                                "bg-red text-white":
                                  player.score < 3 && player.score === number,
                                "bg-yellow text-white":
                                  player.score === 3 && player.score === number,
                              }
                            )}
                          >
                            {number}
                          </span>
                        ))}
                      </div>
                    </td>
                  </>
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
