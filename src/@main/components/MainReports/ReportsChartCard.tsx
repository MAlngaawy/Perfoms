import { Divider } from "@mantine/core";
import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import { useSuperTeamsQuery } from "~/app/store/supervisor/supervisorMainApi";
import classNames from "classnames";

type Props = {
  name: string;
  icon?: string;
  data: {
    name: "strengths" | "moderate" | "weaknesses" | string;
    value: number;
  }[];
  chartColors?: string[];
  onClickFun?: any;
  clickable?: boolean;
};

const COLORS = ["#27AE60", "#F2994A", "#EB5757"];

const ReportsChartCard = ({
  name,
  icon,
  data,
  chartColors = COLORS,
  onClickFun,
  clickable = true,
}: Props) => {
  return (
    <div
      onClick={() => onClickFun()}
      className={classNames(
        "bg-white  flex-col gap-3 rounded-xl shadow-md p-4 flex h-fit w-60",
        {
          "transition-all transform hover:scale-105 hover:shadow-xl  cursor-pointer":
            clickable,
        }
      )}
    >
      <h2 className="w-full text-left"> Punshing {name}</h2>
      <div className="flex relative w-full items-center justify-center">
        <Example chartColors={chartColors} data={data} />
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
            <h3> {data[0].name} </h3>
          </div>
          <h2>
            {Math.floor(
              (data[0].value /
                (data[0].value + data[1].value + data[2].value)) *
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
            <h3> {data[1].name} </h3>
          </div>
          <h2>
            {Math.floor(
              (data[1].value /
                (data[0].value + data[1].value + data[2].value)) *
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
            <h3> {data[2].name} </h3>
          </div>
          <h2>
            {Math.floor(
              (data[2].value /
                (data[0].value + data[1].value + data[2].value)) *
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
  return (
    <PieChart width={150} height={150}>
      <Pie
        data={data}
        cx={"50%"}
        cy={"50%"}
        innerRadius={40}
        outerRadius={55}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry: any, index: any) => (
          <Cell
            key={`cell-${index}`}
            fill={chartColors[index % COLORS.length]}
          />
        ))}
      </Pie>
    </PieChart>
  );
};
