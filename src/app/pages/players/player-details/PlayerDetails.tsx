import React, { useState } from "react";
import PlayerInfoCard from "../components/PlayerInfoCard";
import PlayerNav from "../components/PlayerNav";
import { playerData } from "~/app/pages/home/HomePage";
import ParentInfoCard from "../components/ParentInfoCard";
import { Grid } from "@mantine/core";
import AttendanceCard from "../components/AttendanceCard";
import AttendanceCheckBox from "../components/AttendanceCheckBox";
import TotalDaysCard from "../components/TotalDaysCard";
import Notes from "../components/Notes";
import Performance from "../components/Performance";
import TotalAttendance from "../../reports/components/TotalAttendance";
import { useLocation } from "react-router-dom";

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
  "Saturday., 30 / 7 / 15",
];

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

  return (
    <div>
      <PlayerNav showCard={showCard} setShowCard={setShowCard} />
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
              <div className="h-full flex flex-col gap-3 py-3">
                <TotalAttendance
                  data={[
                    { day: "2/10/2017", attendance: "ATTENDED" },
                    { day: "2/10/2017", attendance: "ATTENDED" },
                    { day: "2/10/2017", attendance: "ATTENDED" },
                    { day: "2/10/2017", attendance: "ATTENDED" },
                    { day: "2/10/2017", attendance: "ABSENT" },
                    { day: "2/10/2017", attendance: "ABSENT" },
                    { day: "2/10/2017", attendance: "ABSENT" },
                    { day: "2/10/2017", attendance: "ATTENDED" },
                    { day: "2/10/2017", attendance: "UPCOMING" },
                    { day: "2/10/2017", attendance: "UPCOMING" },
                    { day: "2/10/2017", attendance: "ATTENDED" },
                    { day: "2/10/2017", attendance: "ATTENDED" },
                  ]}
                />
                <Notes />
              </div>
            </Grid.Col>
          </Grid>
        </>
      )}
      {showCard === "performance" && (
        <>
          <AttendanceCard />
          <Performance />
        </>
      )}
    </div>
  );
};

export default PlayerDetails;
