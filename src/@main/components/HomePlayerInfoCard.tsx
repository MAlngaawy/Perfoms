import React from "react";
import { selectedPlayerFn } from "~/app/store/parent/parentSlice";
import { useSelector } from "react-redux";
import { Player } from "~/app/store/types/parent-types";
import Info from "./Info";
import { useOnePlayerQuery } from "~/app/store/parent/parentApi";

type Props = {};

const HomePlayerInfoCard = (props: Props) => {
  const selectedPlayer: Player = useSelector(selectedPlayerFn);

  const { data: playerInfoData } = useOnePlayerQuery(
    { id: selectedPlayer.id },
    { skip: !selectedPlayer.id }
  );

  return (
    <div className="p-6 h-fit bg-white rounded-3xl">
      <div className="playerName">
        <h2>{playerInfoData?.name.split(" ")[0]}'s info</h2>
      </div>
      <div className="flex flex-col xs:flex-row sm:flex-col justify-around">
        <div className="img my-2">
          <img
            src={
              playerInfoData?.icon
                ? playerInfoData?.icon
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            className=" w-28 rounded-lg object-cover"
            alt="player_image"
          />
        </div>
        <div className="infos">
          <Info label="Name" value={playerInfoData?.name} />
          <Info label="Age" value={playerInfoData?.dob} />
          <div className="flex justify-between">
            <Info
              label="Weight"
              value={`${
                playerInfoData?.weight ? playerInfoData?.weight : "NA"
              } kgm`}
            />
            <Info
              label="height"
              value={`${
                playerInfoData?.height ? playerInfoData?.height : "NA"
              } cm`}
            />
          </div>
          <Info label="Sport" value={playerInfoData?.sport} />
        </div>
      </div>
    </div>
  );
};

export default HomePlayerInfoCard;
