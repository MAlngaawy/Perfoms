import React, { useState } from "react";
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
  const params = useParams();

  const { data: player } = useGetPlayerInfoQuery(
    { player_id: params.id },
    { skip: !params.id }
  );

  const { data: parent } = useGetParentInfoQuery(
    { player_id: params.id },
    { skip: !params.id }
  );

  return (
    <div className="p-4">
      <Grid columns={12}>
        <Grid.Col md={6} span={12}>
          <PlayerInfoCard playerData={player} playerSummary={playerSummary} />
        </Grid.Col>
        <Grid.Col md={6} span={12}>
          <ParentInfoCard
            first_name={parent?.first_name}
            last_name={parent?.last_name}
            avatar={parent?.avatar}
            phone={parent?.mobile}
            supscription={parent?.subscription}
            job={parent?.job}
            id={parent?.id}
            parentName={parent?.first_name}
            playerName={player?.name}
          />
        </Grid.Col>

        {/* Achevments card */}
        <Grid.Col md={6} span={12}>
          <div className="p-4  h-full border border-perfGray4 bg-white rounded-3xl flex flex-col gap-1">
            <h2>Achevements</h2>

            <div className=" flex justify-around my-6 gap-6 h-full">
              <Avatar
                className="w-32 h-full rounded-lg object-cover "
                src={"https://cdn-icons-png.flaticon.com/512/2827/2827014.png"}
                size="xl"
              />
              {params.id === "2" ? (
                <div className="flex flex-col gap-4 items-center">
                  <h2 className="text-lg"> World Cadet Bronze Medalist</h2>
                  <h2 className="text-lg"> Croatia Open Golden Medalist</h2>
                </div>
              ) : params.id === "3" ? (
                <div className="flex flex-col gap-4 items-start">
                  <h2 className="text-lg"> World Junior Quarter Final</h2>
                  <h2 className="text-lg">
                    Fougera and Arabic Championships Silver Medalist
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

            <div className=" flex  justify-around my-6 gap-6 h-full">
              <Avatar
                className="w-32 h-full rounded-lg object-cover "
                src={
                  "https://www.nicepng.com/png/full/86-862080_social-media-marketing-social-media-marketing-icon.png"
                }
                size="xl"
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
