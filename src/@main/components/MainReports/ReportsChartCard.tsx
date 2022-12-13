import { Divider } from "@mantine/core";
import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import { useSuperTeamsQuery } from "~/app/store/supervisor/supervisorMainApi";
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
  onClickFun?: any;
  clickable?: boolean;
};

const COLORS = ["#27AE60", "#F2994A", "#EB5757"];

const ReportsChartCard = ({
  name,
  icon,
  statistics,
  chartColors = COLORS,
  onClickFun,
  clickable = true,
}: Props) => {
  return (
    <div
      onClick={() => onClickFun()}
      className={classNames(
        "bg-white h-full  flex-col gap-3 rounded-xl shadow-md p-4 justify-between flex w-60",
        {
          "transition-all transform hover:scale-105 hover:shadow-xl  cursor-pointer":
            clickable,
        }
      )}
    >
      <h2 className="w-full text-left">{name}</h2>
      <div className="flex relative w-full items-center justify-center">
        {statistics.moderate == 0 &&
        statistics.strength == 0 &&
        statistics.weakness == 0 ? (
          <div className="text-lg font-semibold text-perfGray2">
            No Data Yet
          </div>
        ) : (
          <Example chartColors={chartColors} data={statistics} />
        )}
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
            {Math.floor(
              (statistics.strength /
                (statistics.strength +
                  statistics.moderate +
                  statistics.weakness)) *
                100
            )}
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
            {Math.floor(
              (statistics.moderate /
                (statistics.strength +
                  statistics.moderate +
                  statistics.weakness)) *
                100
            )}
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
            {Math.floor(
              (statistics.weakness /
                (statistics.strength +
                  statistics.moderate +
                  statistics.weakness)) *
                100
            )}
            %
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ReportsChartCard;

const Example = ({ data, chartColors }: any) => {
  const newData = [
    {
      name: "strengths",
      value: data.strength,
    },
    {
      name: "moderate",
      value: data.moderate,
    },
    {
      name: "weaknesses",
      value: data.weakness,
    },
  ];

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
        {newData.map((entry: any, index: any) => (
          <Cell
            key={`cell-${index}`}
            fill={chartColors[index % COLORS.length]}
          />
        ))}
      </Pie>
    </PieChart>
  );
};
