import React, { useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import useWindowSize from "~/@main/hooks/useWindowSize";
import { Player, PlayerAttendances } from "~/app/store/types/parent-types";
import { useSelector } from "react-redux";
import { selectedPlayerFn, timeFilterFn } from "~/app/store/parent/parentSlice";
import { usePlayerCalenderQuery } from "~/app/store/parent/parentApi";
import { useCoachPlayerCalendarQuery } from "~/app/store/coach/coachApi";
import { useSuperPlayerCalendarQuery } from "~/app/store/supervisor/supervisorMainApi";

type Props = {
  player_id?: number | string | undefined;
};

const TotalAttendance = ({ player_id }: Props) => {
  const selectedPlayer: Player = useSelector(selectedPlayerFn);
  const [playerAttendance, setPlayerAttendance] = useState<PlayerAttendances>();
  const timeFilter = useSelector(timeFilterFn);

  const { data: parentPlayerAttendance } = usePlayerCalenderQuery(
    {
      id: selectedPlayer?.id,
      date_from: timeFilter?.from_date,
      date_to: timeFilter?.to_date,
    },
    {
      skip:
        !selectedPlayer?.id || !timeFilter?.from_date || !timeFilter?.to_date,
    }
  );

  const { data: coachPlayerAttendance } = useCoachPlayerCalendarQuery(
    { player_id: player_id },
    { skip: !player_id }
  );

  const { data: superPlayerAttendance } = useSuperPlayerCalendarQuery(
    { player_id: player_id },
    { skip: !player_id }
  );

  useEffect(() => {
    if (parentPlayerAttendance) setPlayerAttendance(parentPlayerAttendance);
    if (coachPlayerAttendance) setPlayerAttendance(coachPlayerAttendance);
    if (superPlayerAttendance) setPlayerAttendance(superPlayerAttendance);
  }, [parentPlayerAttendance, coachPlayerAttendance, superPlayerAttendance]);

  const newData = [
    { name: "Attended", value: 0, color: "#1B59F8" },
    { name: "Absent", value: 0, color: "#EB5757" },
  ];

  if (playerAttendance) {
    for (let i = 0; i < playerAttendance?.results?.length; i++) {
      if (playerAttendance?.results[i].status === "ATTENDED") {
        newData[0].value += 1;
      } else if (playerAttendance?.results[i].status === "ABSENT") {
        newData[1].value += 1;
      }
    }
  }

  const size = useWindowSize();

  let pieWidth = "";
  if (size.width !== undefined && size.width < 1400 && size?.width >= 768) {
    pieWidth = "100%";
  } else {
    pieWidth = "60%";
  }

  if (!playerAttendance) {
    return (
      <div className="flex justify-center items-center h-44">
        <p>No data yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 flex sm:flex-col xl:flex-row justify-around items-center">
      <div className="data flex flex-col sm:flex-row xl:flex-col justify-center items-start gap-4">
        <div>
          <h3 className=" text-lg font-medium text-perfGray1">Total Dayes</h3>
          <h1 className="text-5xl w-full text-left font-bold text-perfGray1">
            {newData[0].value + newData[1].value}
          </h1>
        </div>
        <div className="flex flex-col items-start gap-1">
          <div className="info flex justify-center gap-1 items-start">
            <div className="color w-6 h-4 mt-1 rounded-md bg-perfBlue"></div>
            <div className="flex flex-col">
              <h2 className="text-base">{newData[0].value} Dayes</h2>
              <p className="text-sm text-perfGray3">Attendence</p>
            </div>
          </div>
          <div className="info flex justify-center gap-1 items-start">
            <div className="color w-6 h-4 mt-1 rounded-md bg-perfSecondary"></div>
            <div className="flex flex-col">
              <h2 className="text-base">{newData[1].value} Dayes</h2>
              <p className="text-sm text-perfGray3">Absence</p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="pie"> */}
      <div style={{ width: pieWidth, height: 200 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={newData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={size.width && size.width < 400 ? 30 : 45}
              outerRadius={size.width && size.width < 400 ? 60 : 80}
              paddingAngle={5}
            >
              {newData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* </div> */}
      </div>
    </div>
  );
};

export default TotalAttendance;
