import { Divider } from "@mantine/core";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import classNames from "classnames";

type Props = {
  name: string;
  icon?: string;
  statistics: {
    strength: number;
    moderate: number;
    weakness: number;
  };
  chartColors?: string[];
};

const COLORS = ["#27AE60", "#F2994A", "#EB5757"];

const ChartSide = ({ name, icon, statistics, chartColors = COLORS }: Props) => {
  return (
    <div className="bg-white h-full  flex-col gap-3 rounded-xl p-4 sm:p-2 md:p-4 justify-between flex">
      <h2 className="w-full text-left text-sm">{name}</h2>
      <div className="flex relative w-full items-center justify-center">
        <Example chartColors={chartColors} data={statistics} />
      </div>
      <Divider />
      <div className="flex flex-col w-full items-center gap-4 text-sm">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2">
            <span
              style={{
                backgroundColor: chartColors && chartColors[0],
              }}
              className="w-4 h-4 rounded-full"
            ></span>
            <h3> Strength </h3>
          </div>
          <h2>
            {(statistics &&
              Math.floor(
                (statistics.strength /
                  (statistics.strength +
                    statistics.moderate +
                    statistics.weakness)) *
                  100
              )) ||
              0}
            %
          </h2>
        </div>

        <div className="flex justify-between w-full text-sm">
          <div className="flex items-center gap-2">
            <span
              style={{
                backgroundColor: chartColors && chartColors[1],
              }}
              className="w-4 h-4  rounded-full"
            ></span>
            <h3> Moderate </h3>
          </div>
          <h2>
            {(statistics &&
              Math.floor(
                (statistics.moderate /
                  (statistics.strength +
                    statistics.moderate +
                    statistics.weakness)) *
                  100
              )) ||
              0}
            %
          </h2>
        </div>

        <div className="flex justify-between w-full text-sm">
          <div className="flex items-center gap-2">
            <span
              style={{
                backgroundColor: chartColors && chartColors[2],
              }}
              className="w-4 h-4  rounded-full"
            ></span>
            <h3> Weakness </h3>
          </div>
          <h2>
            {(statistics &&
              Math.floor(
                (statistics.weakness /
                  (statistics.strength +
                    statistics.moderate +
                    statistics.weakness)) *
                  100
              )) ||
              0}
            %
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ChartSide;

const Example = ({ data, chartColors }: any) => {
  const [empty, setEmpty] = useState<boolean>(false);

  useEffect(() => {
    if (data?.strength === 0 && data?.moderate === 0 && data?.weakness === 0) {
      setEmpty(true);
    }
  }, [data]);

  const newData = [
    {
      name: "strengths",
      value: data?.strength,
    },
    {
      name: "moderate",
      value: data?.moderate,
    },
    {
      name: "weaknesses",
      value: data?.weakness,
    },
  ];

  const emptyNewData = [
    {
      name: "strengths",
      value: 10,
    },
    {
      name: "moderate",
      value: 10,
    },
    {
      name: "weaknesses",
      value: 10,
    },
  ];

  if (empty) {
    return (
      <div>
        <PieChart width={150} height={150}>
          <Pie
            data={emptyNewData}
            cx={"50%"}
            cy={"50%"}
            innerRadius={40}
            outerRadius={55}
            fill="#8884d8"
            dataKey="value"
          >
            {newData.map((entry: any, index: any) => {
              return <Cell key={`cell-${index}`} fill={"#CCC"} />;
            })}
          </Pie>
        </PieChart>
      </div>
    );
  }

  return (
    <PieChart width={150} height={150}>
      <Pie
        data={newData}
        cx={"50%"}
        cy={"50%"}
        innerRadius={40}
        outerRadius={55}
        fill="#8884d8"
        dataKey="value"
      >
        {newData.map((entry: any, index: any) => {
          return (
            <Cell
              key={`cell-${index}`}
              fill={
                entry.value === 0 ? "#eee" : chartColors[index % COLORS.length]
              }
            />
          );
        })}
      </Pie>
    </PieChart>
  );
};
