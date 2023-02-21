import React from "react";
import { PlayerData } from "~/app/store/types/user-types";
import Info from "~/@main/components/Info";
import { PerformanceCard } from "~/@main/components/PerformanceCard";
import { CoachPlayerInfo } from "~/app/store/types/coach-types";
import { Avatar } from "@mantine/core";

interface PlayerInfoCardProps {
  playerData: any;
}

const PlayerInfoCard = ({ playerData }: PlayerInfoCardProps) => {
  console.log("playerData", playerData);

  return (
    <div className="p-6 bg-white h-full rounded-3xl border border-perfGray4">
      <h2>{playerData?.name?.split(" ")[0]}'s info</h2>
      <div className="flex flex-col xs:flex-row gap-6">
        <div>
          <div className="img my-2">
            <Avatar
              src={playerData?.icon}
              className="w-40 h-full rounded-lg object-cover "
              alt="parent"
            />
          </div>
        </div>
        <div>
          <Info label="Name" value={playerData?.name} />
          <Info label="Age" value={playerData?.dob} />
          <div className="flex flex-row justify-between gap-5">
            <div className="flex flex-col justify-center">
              <Info label="Weight" value={`${playerData?.weight} kgm`} />
              <Info label="height" value={`${playerData?.height} cm`} />
            </div>
            <Info label="Team" value={"14th team"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerInfoCard;
