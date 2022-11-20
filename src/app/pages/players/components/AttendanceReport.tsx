import React from "react";
import Info from "~/@main/components/Info";
import { PerformanceCard } from "~/@main/components/PerformanceCard";

export interface AttendanceReportProps {
  player: Player;
  playerSummary: any[];
}

interface Player {
  name: string;
  icon_url: string;
  attendances: number;
  absence: number;
  total: number;
}

const AttendanceReport = ({ playerSummary, player }: AttendanceReportProps) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row m-1 md:m-3">
      <div className="flex flex-row gap-3 md:w-72">
        <img
          className="w-32 h-32 object-cover rounded-lg"
          src={player.icon_url}
          alt={player.name}
        />
        <Info label="Name" value={player.name} />
      </div>
      <div className="p-6 pt-2 m-1 md:m-3 h-full bg-white w-full rounded-3xl gap-3">
        <h2 className="font-medium pb-2">Attendance Report Summary</h2>
        <div className=" flex flex-col md:flex-row items-center gap-10">
          {playerSummary?.map((item, idx: number) => {
            return (
              <div key={idx} className="w-full sm:w-44">
                <PerformanceCard
                  name={item.name}
                  number={item.number}
                  bgColor={item.bgColor}
                  textColor={item.textColor}
                >
                  <img className=" w-6 max-w-full" src={item.icon} alt="icon" />
                </PerformanceCard>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AttendanceReport;
