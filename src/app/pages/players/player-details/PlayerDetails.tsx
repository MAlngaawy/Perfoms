import React, { useState } from "react";
import PlayerInfoCard from "../components/PlayerInfoCard";
import PlayerNav from "../components/PlayerNav";
import ParentInfoCard from "../components/ParentInfoCard";
import { Avatar, Grid } from "@mantine/core";
import AttendanceCard from "../components/AttendanceCard";
import AttendanceCheckBox from "../components/AttendanceCheckBox";
import TotalDaysCard from "../components/TotalDaysCard";
import Notes from "../components/Notes";
import Performances from "../components/Performance";
import TotalAttendance from "../../reports/components/TotalAttendance";
import { useLocation, useParams } from "react-router-dom";
import { PlayerData } from "~/app/store/types/user-types";
import { useGetPlayerInfoQuery } from "~/app/store/coach/coachApi";

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

const days = [
  "Saturday., 30 / 7 / 15",
  "Saturday., 30 / 8 / 15",
  "Saturday., 30 / 7 / 15",
  "Saturday., 30 / 7 / 15",
  "Saturday., 30 / 7 / 15",
  "Saturday., 30 / 7 / 15",
  "Saturday., 30 / 7 / 15",
  "Saturday., 30 / 7 / 15",
  "Saturday., 30 / 7 / 15",
  "Saturday., 30 / 7 / 15",
  "Saturday., 30 / 7 / 15",
  "Saturday., 30 / 7 / 15",
  "Saturday., 30 / 7 / 15",
  "Saturday., 30 / 7 / 15",
  "Saturday., 30 / 7 / 15",
  "Saturday., 30 / 7 / 15",
  "Saturday., 30 / 7 / 15",
  "Saturday., 30 / 7 / 15",
  "Saturday., 30 / 7 / 15",
  "Saturday., 30 / 7 / 15",
  "Saturday., 30 / 7 / 15",
  "Saturday., 30 / 7 / 15",
  "Saturday., 30 / 7 / 15",
  "Saturday., 30 / 7 / 15",
  "Saturday., 30 / 7 / 15",
];

const performancesDate = [
  {
    icon: "https://static.thenounproject.com/png/3194184-200.png",
    metric: "Pushing",
    score: 2,
  },
  {
    icon: "https://static.thenounproject.com/png/3194184-200.png",
    metric: "LOL",
    score: 3,
  },
  {
    icon: "https://static.thenounproject.com/png/3194184-200.png",
    metric: "LOL33",
    score: 4,
  },
  {
    icon: "https://static.thenounproject.com/png/3194184-200.png",
    metric: "Pushing",
    score: 2,
  },
  {
    icon: "https://static.thenounproject.com/png/3194184-200.png",
    metric: "LOL",
    score: 1,
  },
  {
    icon: "https://static.thenounproject.com/png/3194184-200.png",
    metric: "LOL33",
    score: 4,
  },
  {
    icon: "https://static.thenounproject.com/png/3194184-200.png",
    metric: "Pushing",
    score: 2,
  },
  {
    icon: "https://static.thenounproject.com/png/3194184-200.png",
    metric: "LOL",
    score: 1,
  },
  {
    icon: "https://static.thenounproject.com/png/3194184-200.png",
    metric: "LOL33",
    score: 3,
  },
  {
    icon: "https://static.thenounproject.com/png/3194184-200.png",
    metric: "Pushing",
    score: 3,
  },
  {
    icon: "https://static.thenounproject.com/png/3194184-200.png",
    metric: "LOL",
    score: 1,
  },
  {
    icon: "https://static.thenounproject.com/png/3194184-200.png",
    metric: "LOL33",
    score: 4,
  },
  {
    icon: "https://static.thenounproject.com/png/3194184-200.png",
    metric: "Pushing",
    score: 2,
  },
  {
    icon: "https://static.thenounproject.com/png/3194184-200.png",
    metric: "LOL",
    score: 1,
  },
  {
    icon: "https://static.thenounproject.com/png/3194184-200.png",
    metric: "LOL33",
    score: 4,
  },
  {
    icon: "https://static.thenounproject.com/png/3194184-200.png",
    metric: "Pushing",
    score: 3,
  },
  {
    icon: "https://static.thenounproject.com/png/3194184-200.png",
    metric: "LOL",
    score: 1,
  },
  {
    icon: "https://static.thenounproject.com/png/3194184-200.png",
    metric: "LOL33",
    score: 4,
  },
  {
    icon: "https://static.thenounproject.com/png/3194184-200.png",
    metric: "Pushing",
    score: 3,
  },
  {
    icon: "https://static.thenounproject.com/png/3194184-200.png",
    metric: "LOL",
    score: 1,
  },
  {
    icon: "https://static.thenounproject.com/png/3194184-200.png",
    metric: "LOL33",
    score: 4,
  },
  {
    icon: "https://static.thenounproject.com/png/3194184-200.png",
    metric: "Pushing",
    score: 2,
  },
  {
    icon: "https://static.thenounproject.com/png/3194184-200.png",
    metric: "LOL",
    score: 1,
  },
  {
    icon: "https://static.thenounproject.com/png/3194184-200.png",
    metric: "LOL33",
    score: 4,
  },
];

const playerData: PlayerData = {
  name: "Ahmed Saleh Mostafa",
  dob: "15/12/2006",
  weight: 50,
  height: 150,
  icon_url:
    "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=2000",
  sport: {
    name: "kickboxing",
  },
  team: {
    name: "14Th team",
    description: "12-14 years",
    coaches: [
      {
        first_name: "Ahmed",
        last_name: "Saleh",
        avatar:
          "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=2000",
      },
      {
        first_name: "Ahmed",
        last_name: "Saleh",
        avatar:
          "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=2000",
      },
      {
        first_name: "Ahmed",
        last_name: "Saleh",
        avatar:
          "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=2000",
      },
    ],
  },
  gender: "M",
};

const parent = {
  icon_url:
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  name: "Ahmed Salah Mostafa",
  dob: "15/12/1991",
  players: "1",
};

const PlayerDetails = () => {
  const [showCard, setShowCard] = useState("playerInfo");
  const location = useLocation();
  const params = useParams();

  const { data: player } = useGetPlayerInfoQuery(
    { player_id: params.id },
    { skip: !params.id }
  );

  console.log(player);

  return (
    <div className="p-4">
      {/* <Avatar src={player?.icon} /> */}
      <PlayerInfoCard
        playerData={player || playerData}
        playerSummary={playerSummary}
      />
      {/* <PlayerNav showCard={showCard} setShowCard={setShowCard} />
      {showCard === "playerInfo" && (
        <Grid columns={12}>
          <Grid.Col sm={9} span={12}>
            <PlayerInfoCard
              playerData={playerData}
              playerSummary={playerSummary}
            />
          </Grid.Col>
          <Grid.Col sm={3} span={12}>
            <ParentInfoCard id={location.state} {...parent} />
          </Grid.Col>
        </Grid>
      )}
      {showCard === "attendance" && (
        <>
          <AttendanceCard />
          <Grid
            sx={{
              height: 600,
            }}
            columns={12}
          >
            <Grid.Col sm={8} span={12}>
              <AttendanceCheckBox dates={days} />
            </Grid.Col>
            <Grid.Col sm={4} span={12}>
              <Grid>
                <Grid.Col span={12}>
                  <TotalAttendance />
                </Grid.Col>
                <Grid.Col span={12}>
                  <div>
                    <Notes />
                  </div>
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>
        </>
      )}
      {showCard === "performance" && (
        <>
          <AttendanceCard />
          <Performances data={performancesDate} />
        </>
      )} */}
    </div>
  );
};

export default PlayerDetails;
