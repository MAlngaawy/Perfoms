import { Avatar } from "@mantine/core";
import React from "react";

type Props = {};

const response = [
  {
    name: "mohammed",
    id: 1,
    icon: "https://clicklovegrow.com/wp-content/uploads/2020/01/Charlie-ONeill-Advanced-Graduate.jpg",
    player_kpis: [
      {
        id: 2,
        name: "Pushing",
        player_kpi_metric: [
          {
            id: 2,
            name: "Right Leg",
            last_score: 1,
          },
          {
            id: 39,
            name: "Left Leg",
            last_score: 2,
          },
          {
            id: 111,
            name: "Pushing Technique",
            last_score: 3,
          },
        ],
      },
      {
        id: 4,
        name: "Fitness",
        player_kpi_metric: [
          {
            id: 982,
            name: "Endurance",
            last_score: 3,
          },
          {
            id: 1017,
            name: "Balance",
            last_score: 5,
          },
          {
            id: 1052,
            name: "Flexibility",
            last_score: 1,
          },
        ],
      },
    ],
  },

  {
    name: "Ahmed",
    id: 1,
    icon: "https://i.pinimg.com/474x/38/df/16/38df162671b772334b8bc7a9db34290e.jpg",
    player_kpis: [
      {
        id: 21,
        name: "Pushing",
        player_kpi_metric: [
          {
            id: 21,
            name: "Right Leg",
            last_score: 2,
          },
          {
            id: 391,
            name: "Left Leg",
            last_score: 4,
          },
          {
            id: 1112,
            name: "Pushing Technique",
            last_score: 3,
          },
        ],
      },
      {
        id: 43,
        name: "Fitness",
        player_kpi_metric: [
          {
            id: 9825,
            name: "Endurance",
            last_score: 3,
          },
          {
            id: 10177,
            name: "Balance",
            last_score: 5,
          },
          {
            id: 10526,
            name: "Flexibility",
            last_score: 3,
          },
        ],
      },
    ],
  },
];

const player_kpis = [
  {
    id: 21,
    name: "Pushing",
    player_kpi_metric: [
      {
        id: 21,
        name: "Right Leg",
        last_score: 2,
      },
      {
        id: 391,
        name: "Left Leg",
        last_score: 4,
      },
      {
        id: 1112,
        name: "Pushing Technique",
        last_score: 3,
      },
    ],
  },
  {
    id: 43,
    name: "Fitness",
    player_kpi_metric: [
      {
        id: 9825,
        name: "Endurance",
        last_score: 3,
      },
      {
        id: 10177,
        name: "Balance",
        last_score: 5,
      },
      {
        id: 10526,
        name: "Flexibility",
        last_score: 3,
      },
    ],
  },
];

const PerfScoreTable = (props: Props) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Metrics</th>
            {response.map((player) => {
              return (
                <th>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Avatar
                      className="mx-auto"
                      size={"lg"}
                      radius="xl"
                      src={player.icon}
                    />
                    <h2>{player.name}</h2>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        {player_kpis.map(({ name, player_kpi_metric }) => (
          <>
            <tbody className="labels">
              <tr>
                <td colSpan={5}>{name}</td>
              </tr>
            </tbody>
            {player_kpi_metric.map((oneMetric) => {
              return (
                <tr>
                  <td>{oneMetric.name}</td>
                  <td>$7,685.00</td>
                  <td>$3,544.00</td>
                </tr>
              );
            })}
          </>
        ))}
      </table>
    </div>
  );
};

export default PerfScoreTable;
