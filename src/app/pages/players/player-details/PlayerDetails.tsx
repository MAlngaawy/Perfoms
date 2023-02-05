import React, { useEffect, useState } from "react";
import PlayerInfoCard from "../components/PlayerInfoCard";
import PlayerNav from "../components/PlayerNav";
import ParentInfoCard from "../components/ParentInfoCard";
import { Avatar, Grid } from "@mantine/core";
import { Link, useLocation, useParams } from "react-router-dom";
import { PlayerData } from "~/app/store/types/user-types";
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
import { useUserQuery } from "~/app/store/user/userApi";
import { selectedPlayerTeamFn } from "~/app/store/parent/parentSlice";
import { useSelector } from "react-redux";

// dummy data
const playerSummary = [
  {
    name: "Attendance",
    number: 8,
    bgColor: "#00E0961A",
    textColor: "#27AE60",
    icon: "/assets/images/gym.png",
  },
  {
    name: "Strengths",
    number: 8,
    bgColor: "#00E0961A",
    textColor: "#27AE60",
    icon: "/assets/images/gym.png",
  },
  {
    name: "Absence",
    number: 8,
    bgColor: "#EB57571A",
    textColor: "#EB5757",
    icon: "/assets/images/weakness.png",
  },
  {
    name: "Weaknesses",
    number: 8,
    bgColor: "#EB57571A",
    textColor: "#EB5757",
    icon: "/assets/images/weakness.png",
  },
  {
    name: "Total",
    number: 8,
    bgColor: "#2F80ED1A",
    textColor: "#2F80ED",
    icon: "/assets/images/tasks.png",
  },
  {
    name: "Actions",
    number: 8,
    bgColor: "#2F80ED1A",
    textColor: "#2F80ED",
    icon: "/assets/images/tasks.png",
  },
  {
    name: "Recommendations",
    number: 8,
    bgColor: "#00A1FF1A",
    textColor: "#00A1FF",
    icon: "/assets/images/discussion.png",
  },
];

const PlayerDetails = () => {
  const [playerData, setPlayerData] = useState<CoachPlayerInfo>();
  const [parentData, setParentData] = useState<PlayerParent>();

  const { data: user } = useUserQuery(null);

  const status = useLocation().state;

  const params = useParams();
  console.log(params);

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

  useEffect(() => {
    if (coachPlayer) setPlayerData(coachPlayer);
    if (coachParent) setParentData(coachParent);
    if (superPlayer) setPlayerData(superPlayer);
    if (superParent) setParentData(superParent);
    console.log("Parent", parentData);
  }, [coachParent, coachPlayer, superParent, superPlayer]);

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
          <PlayerInfoCard
            playerData={playerData}
            playerSummary={playerSummary}
          />
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

        {/* Achevments card */}

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
              {params.id === "2" ? (
                <div className="flex flex-col gap-4 items-center ">
                  <Link to="/media-teams/media/4">
                    <h2 className="text-2xl underline hover:text-perfBlue transform hover:scale-105">
                      World Champion 1
                    </h2>
                  </Link>
                  <Link to="/media-teams/media/5">
                    <h2 className="text-2xl underline hover:text-perfBlue transform hover:scale-105">
                      World Champion 2
                    </h2>
                  </Link>
                  <Link to="/media-teams/media/6">
                    <h2 className="text-2xl underline hover:text-perfBlue transform hover:scale-105">
                      World Champion 3
                    </h2>
                  </Link>
                </div>
              ) : params.id === "3" ? (
                <div className="flex flex-col gap-4 items-center ">
                  <Link to="/media-teams/media/7">
                    <h2 className="text-2xl underline hover:text-perfBlue transform hover:scale-105">
                      World Champion 1
                    </h2>
                  </Link>
                  <Link to="/media-teams/media/8">
                    <h2 className="text-2xl underline hover:text-perfBlue transform hover:scale-105">
                      World Champion 2
                    </h2>
                  </Link>
                  <Link to="/media-teams/media/9">
                    <h2 className="text-2xl underline hover:text-perfBlue transform hover:scale-105">
                      World Champion 3
                    </h2>
                  </Link>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default PlayerDetails;
