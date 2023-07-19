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
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  player_id?: number | string | undefined;
};

const HomePlayerInfoCard = ({ player_id }: Props) => {
  const selectedPlayer: Player = useSelector(selectedPlayerFn);
  const [playerInfoData, setPlayerInfoData] = useState<CoachPlayerInfo>();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { data: user } = useUserQuery({});

  const { data: parentPlayerInfoData, refetch: refetchPlayerData } =
    useOnePlayerQuery(
      { id: selectedPlayer?.id },
      {
        skip: !selectedPlayer?.id,
      }
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

  useEffect(() => {
    console.log("playerInfoData", playerInfoData);
  }, [playerInfoData]);

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
        {user && ["Parent", "Player"].includes(user?.user_type) && (
          <EditPlayer
            player={playerInfoData}
            refetchPlayerData={refetchPlayerData}
          />
        )}
      </div>
      <div className="flex flex-col gap-x-10 xs:flex-row sm:flex-col justify-around">
        <div
          onClick={() => {
            navigate(`/players/${selectedPlayer?.id}`);
          }}
          className="img my-2 transform hover:scale-105 cursor-pointer transition-all"
        >
          <Avatar
            src={playerInfoData?.icon}
            className=" w-full h-72 rounded-lg object-cover"
            alt="player_image"
          />
        </div>
        <div className="infos">
          <Info label="Name" value={playerInfoData?.name} />
          <Info label="Age" value={playerInfoData?.dob} />
          <Info
            label="Gender"
            value={playerInfoData.gender === "M" ? "Male" : "Female"}
          />
          <div className="flex gap-x-4 flex-wrap">
            {playerInfoData?.sport &&
            playerInfoData?.sport.toLocaleLowerCase() === "taekwondo" ? (
              <>
                {playerInfoData?.height && (
                  <Info label="Height" value={playerInfoData?.height} />
                )}
                {playerInfoData?.world_weight && (
                  <Info
                    label="World Weight"
                    value={playerInfoData?.world_weight}
                  />
                )}
                {playerInfoData?.olympic_weight && (
                  <Info
                    label="Olympic Weight"
                    value={playerInfoData?.olympic_weight}
                  />
                )}
                {playerInfoData?.front_leg !== "NONE" && (
                  <Info
                    label="Preferred Front Leg"
                    value={playerInfoData?.front_leg}
                  />
                )}
              </>
            ) : (
              <>
                {playerInfoData?.weight && (
                  <Info label="Weight" value={playerInfoData?.weight} />
                )}
                {playerInfoData?.height && (
                  <Info label="Height" value={playerInfoData?.height} />
                )}
              </>
            )}
          </div>
          <div className="flex justify-between gap-x-4 flex-wrap">
            <Info label="Sport" value={playerInfoData?.sport} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePlayerInfoCard;
