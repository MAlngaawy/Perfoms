import { Divider } from "@mantine/core";
import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

type Props = {
  name: string;
  icon?: string;
  data: {
    name: "strengths" | "moderate" | "weaknesses";
    value: number;
  }[];
};

const ReportsChartCard = ({ name, icon, data }: Props) => {
  return (
    <div className="bg-white flex-col gap-6 rounded-xl p-4 flex m-4 h-fit w-80">
      <h2 className="w-full text-left">{name}</h2>
      <div className="flex relative w-full items-center justify-center">
        <Example data={data} />
      </div>
      <Divider />
      <div className="flex flex-col w-full items-center gap-4">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2">
            <span
              style={{
                backgroundColor: "#27AE60",
              }}
              className="w-4 h-4 rounded-full"
            ></span>
            <h3> Strengths </h3>
          </div>
          <h2>{data[0].value}%</h2>
        </div>

        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2">
            <span
              style={{
                backgroundColor: "#F2994A",
              }}
              className="w-4 h-4  rounded-full"
            ></span>
            <h3> Moderate </h3>
          </div>
          <h2>{data[1].value}%</h2>
        </div>

        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2">
            <span
              style={{
                backgroundColor: "#F2994A",
              }}
              className="w-4 h-4  rounded-full"
            ></span>
            <h3> Weaknesses </h3>
          </div>
          <h2>{data[2].value}%</h2>
        </div>
      </div>
    </div>
  );
};

export default ReportsChartCard;

const COLORS = ["#27AE60", "#F2994A", "#EB5757"];

const Example = ({ data }: any) => {
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
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};
