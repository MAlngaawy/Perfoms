import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  XAxis,
  PieChart,
  Pie,
} from "recharts";

const data01 = [
  {
    name: "Attendance",
    value: 18,
  },
  {
    name: "Absence",
    value: 3,
  },
];

type Props = {};

const TotalDaysCard = (props: Props) => {
  return (
    <div className="p-4 m-1 md:m-3 bg-white rounded-3xl">
      <div className="flex flex-col md:flex-row items-center">
        <div className="p-3 w-2/4 text-center">
          <h2 className="font-medium pb-2">Total days</h2>
          <h1 className="text-4xl font-bold pb-2">21</h1>
        </div>
        <PieChart width={240} height={200}>
          <Pie
            data={data01}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={35}
            outerRadius={70}
            fill="#2F80ED"
            label
            startAngle={200}
            endAngle={560}
          />
          <Legend />
          <Tooltip cursor={{ stroke: "red", strokeWidth: 2 }} />
        </PieChart>
      </div>
    </div>
  );
};

export default TotalDaysCard;
