import { useEffect, useState } from "react";
import PlayerInfoCard from "../../../components/PlayerInfoCard";
import ParentInfoCard from "../../../components/ParentInfoCard";
import { Grid } from "@mantine/core";
import { useLocation, useParams } from "react-router-dom";
import {
  useGetParentInfoQuery,
  useGetPlayerInfoQuery,
} from "~/app/store/coach/coachApi";
import { CoachPlayerInfo, PlayerParent } from "~/app/store/types/coach-types";
import {
  useGetSuperParentInfoQuery,
  useGetSuperPlayerInfoQuery,
} from "~/app/store/supervisor/supervisorMainApi";
import CustomBreadCrumbs from "~/@main/components/BreadCrumbs";
import { usePlayerEventsQuery, useUserQuery } from "~/app/store/user/userApi";
import {
  useAdminPlayerInfoQuery,
  useAdminPlayerParentInfoQuery,
} from "~/app/store/clubManager/clubManagerApi";

type Props = {};

const PlayerInfo = (props: Props) => {
  const [playerData, setPlayerData] = useState<CoachPlayerInfo>();
  const [parentData, setParentData] = useState<PlayerParent>();
  const params = useParams();
  console.log(params);

  const { data: playerEvents } = usePlayerEventsQuery(
    { player_id: params.id },
    { skip: !params.id }
  );

  const { data: user } = useUserQuery(null);

  const status = useLocation().state;

  const { data: coachPlayer } = useGetPlayerInfoQuery(
    { player_id: params.id },
    { skip: !params.id || user?.user_type !== "Coach" }
  );

  const { data: coachParent } = useGetParentInfoQuery(
    { player_id: params.id },
    { skip: !params.id || user?.user_type !== "Coach" }
  );

  const { data: superPlayer } = useGetSuperPlayerInfoQuery(
    { player_id: params.id },
    { skip: !params.id || user?.user_type !== "Supervisor" }
  );

  const { data: superParent } = useGetSuperParentInfoQuery(
    { player_id: params.id },
    { skip: !params.id || user?.user_type !== "Supervisor" }
  );

  const { data: adminPlayer } = useAdminPlayerInfoQuery(
    { player_id: params.id },
    { skip: !params.id || user?.user_type !== "Admin" }
  );

  const { data: adminParent } = useAdminPlayerParentInfoQuery(
    { player_id: params.id },
    { skip: !params.id || user?.user_type !== "Admin" }
  );

  useEffect(() => {
    if (coachPlayer) setPlayerData(coachPlayer);
    if (coachParent) setParentData(coachParent);

    if (superPlayer) setPlayerData(superPlayer);
    if (superParent) setParentData(superParent);

    if (adminPlayer) setPlayerData(adminPlayer);
    if (adminParent) setParentData(adminParent);
    console.log("Parent", parentData);
  }, [
    coachParent,
    coachPlayer,
    superParent,
    superPlayer,
    playerEvents,
    adminPlayer,
    adminParent,
  ]);

  return (
    <div className="p-4 pt-0">
      <CustomBreadCrumbs
        items={[
          {
            title: user?.user_type === "Supervisor" ? "Team" : "Players",
            href:
              user?.user_type === "Supervisor"
                ? `/supervisor/teams/${status.teamId}`
                : "/players",
          },
          { title: playerData?.name || "No name", href: "" },
        ]}
      />
      <Grid columns={12}>
        <Grid.Col md={6} span={12}>
          <PlayerInfoCard playerData={playerData} />
        </Grid.Col>
        <Grid.Col md={6} span={12}>
          <ParentInfoCard
            first_name={parentData?.first_name}
            last_name={parentData?.last_name}
            avatar={parentData?.avatar}
            phone={parentData?.mobile}
            supscription={parentData?.subscription}
            job={parentData?.job}
            id={parentData?.id}
          />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default PlayerInfo;

//Future usage

/**
 * 
 * 
 * 
 * {/* Achevments card 
        {/* 
        <Grid.Col md={6} span={12}>
          <div className="p-4  h-full border border-perfGray4 bg-white rounded-3xl flex flex-col gap-1">
            <h2>Achevements</h2>

            <div className=" flex flex-col xs:flex-row justify-around my-6 gap-6 h-full">
              <Avatar
                className="rounded-lg object-cover "
                src={"https://cdn-icons-png.flaticon.com/512/2827/2827014.png"}
                size={200}
              />

              {params.id === "2" ? (
                <div className="flex flex-col gap-4 ">
                  <h2 className="text-lg"> World Cadet Bronze Medalist</h2>
                  <h2 className="text-lg">
                    {" "}
                    Beirut Open 2017 Golden Medallist
                  </h2>
                  <h2 className="text-lg">
                    {" "}
                    Arabian Open 2020 Bronze Medalist
                  </h2>
                  <h2 className="text-lg">
                    {" "}
                    Fujairah Open 2020 Golden Medalist{" "}
                  </h2>
                  <h2 className="text-lg">
                    {" "}
                    Fujairah Open 2022 Silver Medalist
                  </h2>
                  <h2 className="text-lg">
                    {" "}
                    Arabian Open 2022 Golden Medalist
                  </h2>
                  <h2 className="text-lg">
                    {" "}
                    Croatia Open 2022 Golden Medalist
                  </h2>
                </div>
              ) : params.id === "3" ? (
                <div className="flex flex-col gap-4 items-start">
                  <h2 className="text-lg"> World Junior Quarter Final</h2>
                  <h2 className="text-lg">
                    Silver Medalist Fujairah Championship
                  </h2>
                  <h2 className="text-lg">
                    Silver Medalist Arabian Championship
                  </h2>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </Grid.Col>

        <Grid.Col md={6} span={12}>
          <div className="p-4  h-full border border-perfGray4 bg-white rounded-3xl flex flex-col gap-1">
            <h2>Media</h2>

            <div className=" flex flex-col xs:flex-row justify-around my-6 gap-6 h-full">
              <Avatar
                className="rounded-lg object-cover "
                src={
                  "https://www.nicepng.com/png/full/86-862080_social-media-marketing-social-media-marketing-icon.png"
                }
                size={200}
              />
              <div className="flex flex-col gap-4 items-center ">
                {playerEvents?.results.map((event) => {
                  return (
                    <Link to={`/media/${event.id}`}>
                      <h2 className="text-2xl underline hover:text-perfBlue transform hover:scale-105">
                        {event.name}
                      </h2>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </Grid.Col> 
 * 
 * 
 */
