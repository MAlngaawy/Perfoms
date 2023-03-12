import React, { useEffect, useState } from "react";
import { selectedPlayerFn } from "~/app/store/parent/parentSlice";
import { useDispatch, useSelector } from "react-redux";
import { Player } from "~/app/store/types/parent-types";
import Info from "./Info";
import { useOnePlayerQuery } from "~/app/store/parent/parentApi";
import NoData from "./NoData";
import { CoachPlayerInfo } from "~/app/store/types/coach-types";
import { useGetPlayerInfoQuery } from "~/app/store/coach/coachApi";
import { useGetSuperPlayerInfoQuery } from "~/app/store/supervisor/supervisorMainApi";
import { Avatar, Skeleton } from "@mantine/core";
import { useAdminPlayerInfoQuery } from "~/app/store/clubManager/clubManagerApi";
import { useUserQuery } from "~/app/store/user/userApi";
import AppIcons from "../core/AppIcons";
import { changemodalState } from "~/app/store/app/modalSlice";
import EditPlayer from "~/app/pages/home/molecules/EditPlayer";

type Props = {
  player_id?: number | string | undefined;
};

const HomePlayerInfoCard = ({ player_id }: Props) => {
  const selectedPlayer: Player = useSelector(selectedPlayerFn);
  const [playerInfoData, setPlayerInfoData] = useState<CoachPlayerInfo>();
  const { data: user } = useUserQuery({});

  const { data: parentPlayerInfoData, refetch: refetchPlayerData } =
    useOnePlayerQuery(
      { id: selectedPlayer?.id },
      { skip: !selectedPlayer?.id || user?.user_type !== "Parent" }
    );

  const { data: coachPlayerInfo } = useGetPlayerInfoQuery(
    { player_id: player_id },
    { skip: user?.user_type !== "Coach" }
  );

  const { data: superPlayerInfo } = useGetSuperPlayerInfoQuery(
    { player_id: player_id },
    { skip: !player_id || user?.user_type !== "Supervisor" }
  );

  const { data: adminPlayerInfo, refetch: refetchAdminPlayerData } =
    useAdminPlayerInfoQuery(
      { player_id: player_id },
      { skip: !player_id || user?.user_type !== "Admin" }
    );

  useEffect(() => {
    if (parentPlayerInfoData) setPlayerInfoData(parentPlayerInfoData);
    if (coachPlayerInfo) setPlayerInfoData(coachPlayerInfo);
    if (superPlayerInfo) setPlayerInfoData(superPlayerInfo);
    if (adminPlayerInfo) setPlayerInfoData(adminPlayerInfo);
  }, [parentPlayerInfoData, coachPlayerInfo, superPlayerInfo, adminPlayerInfo]);

  if (!playerInfoData) {
    return (
      <div className="p-6 h-full bg-white rounded-3xl flex justify-center items-center">
        <Skeleton width={"100%"} height={"100%"} radius={"lg"} />
        {/* <NoData className="flex-col text-center text-sm" /> */}
      </div>
    );
  }

  return (
    <div className="p-6 h-full bg-white rounded-3xl w-full">
      <div className="playerName flex justify-between  items-center">
        <h2>{playerInfoData?.name.split(" ")[0]}'s info</h2>
        {user?.user_type === "Parent" && (
          <EditPlayer
            player={playerInfoData}
            refetchPlayerData={refetchPlayerData}
          />
        )}
      </div>
      <div className="flex flex-col xs:flex-row sm:flex-col justify-around">
        <div className="img my-2">
          <Avatar
            src={playerInfoData?.icon}
            className=" w-full h-72 rounded-lg object-cover"
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
