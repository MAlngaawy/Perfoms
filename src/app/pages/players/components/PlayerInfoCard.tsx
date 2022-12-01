import React from "react";
import { PlayerData } from "~/app/store/types/user-types";
import Info from "~/@main/components/Info";
import { PerformanceCard } from "~/@main/components/PerformanceCard";
import { CoachPlayerInfo } from "~/app/store/types/coach-types";
import { Avatar } from "@mantine/core";

interface PlayerInfoCardProps {
  playerData: any;
  playerSummary: any[];
}

const PlayerInfoCard = ({ playerSummary, playerData }: PlayerInfoCardProps) => {
  return (
    <div>
      <div className="p-6 m-1 md:m-3 md:h-80 bg-white rounded-3xl flex flex-col md:flex-row items-center md:items-end gap-6">
        <div className="flex flex-col xs:flex-row gap-4">
          <div>
            {/* <div className="playerName">
              <h2>{playerData?.name?.split(" ")[0]}'s info</h2>
            </div> */}
            <div className="img my-2">
              <Avatar
                src={playerData?.icon_url}
                className="w-36 h-28 md:h-48 rounded-lg object-cover"
                alt="player_image"
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

        <div className="flex flex-row flex-wrap md:w-1/2 gap-5">
          {playerSummary?.map((item, idx: number) => {
            return (
              <div key={idx} className="">
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

export default PlayerInfoCard;
