import { Divider } from "@mantine/core";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import classNames from "classnames";

type Props = {
  name: string;
  icon?: string;
  player_attendance: {
    attends: number;
    absent: number;
    upcoming: number;
  };
};

const chartColors = ["#27AE60", "#EB5757", "#A3A3A3"];

const AttendReportsChart = ({ name, icon, player_attendance }: Props) => {
  return (
    <div
      className={classNames(
        "bg-white  flex-col gap-3 rounded-xl shadow-md p-4 flex h-fit w-60"
      )}
    >
      <h2 className="w-full text-left">{name}</h2>
      <div className="flex relative w-full items-center justify-center">
        {player_attendance.attends == 0 &&
        player_attendance.absent == 0 &&
        player_attendance.upcoming == 0 ? (
          <div className="text-lg font-semibold text-perfGray2">
            No Data Yet
          </div>
        ) : (
          <Example chartColors={chartColors} data={player_attendance} />
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
            <h3> Attend </h3>
          </div>
          <h2>
            {Math.floor(
              (player_attendance.attends /
                (player_attendance.attends +
                  player_attendance.absent +
                  player_attendance.upcoming)) *
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
            <h3> Absent </h3>
          </div>
          <h2>
            {Math.floor(
              (player_attendance.absent /
                (player_attendance.attends +
                  player_attendance.absent +
                  player_attendance.upcoming)) *
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
            <h3> Upcoming </h3>
          </div>
          <h2>
            {Math.floor(
              (player_attendance.upcoming /
                (player_attendance.attends +
                  player_attendance.absent +
                  player_attendance.upcoming)) *
                100
            )}
            %
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AttendReportsChart;

const Example = ({ data, chartColors }: any) => {
  const newData = [
    {
      name: "attends",
      value: data.attends,
    },
    {
      name: "absent",
      value: data.absent,
    },
    {
      name: "upcoming",
      value: data.upcoming,
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
            fill={chartColors[index % chartColors.length]}
          />
        ))}
      </Pie>
    </PieChart>
  );
};
