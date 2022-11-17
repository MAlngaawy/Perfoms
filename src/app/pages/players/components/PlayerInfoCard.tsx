import React from "react";
import { PlayerData } from "~/app/store/types/user-types";
import Info from "~/@main/components/Info";
import { PerformanceCard } from "~/@main/components/PerformanceCard";

interface PlayerInfoCardProps {
  playerData: PlayerData;
  playerSummary: any[];
}

const PlayerInfoCard = ({ playerSummary, playerData }: PlayerInfoCardProps) => {
  return (
    <div>
      <div className="p-6 m-1 md:m-3 md:h-80 bg-white rounded-3xl flex flex-col md:flex-row items-center md:items-end gap-3">
        <div>
          <div className="playerName">
            <h2>{playerData?.name?.split(" ")[0]}'s info</h2>
          </div>
          <div className="img my-2">
            <img
              src={
                playerData?.icon_url
                  ? playerData?.icon_url
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              className="w-36 h-28 md:h-48 rounded-lg object-cover"
              alt="player_image"
            />
          </div>
        </div>
        <div className="infos w-52">
          <Info label="Name" value={playerData?.name} />
          <Info label="Age" value={playerData?.dob} />
          <div className="flex flex-row justify-between gap-5">
            <div className="flex flex-col justify-center">
              <Info label="Weight" value={`${playerData?.weight} kgm`} />
              <Info label="Sport" value={playerData?.sport?.name} />
            </div>
            <div className="flex flex-col justify-center">
              <Info label="height" value={`${playerData?.height} cm`} />
              {/*'team' not static waiting for database */}
              <Info label="Team" value={"14th team"} />
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-wrap md:w-1/2 gap-5">
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

export default PlayerInfoCard;
