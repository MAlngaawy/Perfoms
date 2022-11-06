import React, { useState } from "react";
import { Dropdown } from "~/@main/components/Dropdown";
import { Grid } from "@mantine/core";
import Card from "~/@main/components/Card";
import { PlayerData } from "~/app/store/types/user-types";
import { Link } from "react-router-dom";
import SecondNav from "./organisms/SecondNav";
import AppIcons from "~/@main/core/AppIcons";

// dummy data
export const playerData: PlayerData = {
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

const playerSummary = [
  {
    name: "Strengths",
    number: 8,
    bgColor: "#00E0961A",
    textColor: "#27AE60",
    icon: "/assets/images/gym.png",
  },
  {
    name: "Weaknesses",
    number: 8,
    bgColor: "#EB57571A",
    textColor: "#EB5757",
    icon: "/assets/images/weakness.png",
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

export type Players = {
  name: string;
  icon_url: string;
};

export const players: Players[] = [
  {
    name: "Ahmed Sadek",
    icon_url:
      "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=2000",
  },
  {
    name: "Ahmed Sadek",
    icon_url:
      "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=2000",
  },
];

// ==================

const HomePage = () => {
  const [selectedplayer, setSelectedPlayer] = useState<any>(null);

  return (
    <div className="home-page px-5 mb-20">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <SecondNav
          players={players}
          selectedplayer={selectedplayer}
          setSelectedPlayer={setSelectedPlayer}
        />
        <div className="flex flex-col md:flex-row gap-3 justify-center items-center pt-3 md:pt-0">
          <Dropdown
            label="Performance"
            listItems={["Primary team", "Primary group"]}
          />
          <Dropdown label="This week" listItems={[]} />
        </div>
      </div>
      <Grid columns={12} gutter={20}>
        <Grid.Col sm={3} span={12}>
          <Card type="playerInfo" playerData={playerData} />
        </Grid.Col>
        <Grid.Col sm={9} span={12}>
          <Link to="/Reports">
            <Card type="performanceSummary" playerSummary={playerSummary} />
          </Link>
        </Grid.Col>
      </Grid>
      <Grid columns={14} gutter={20} className="info mt-3">
        <Grid.Col sm={4} span={14}>
          <Card type="teamInfo" playerData={playerData} />
        </Grid.Col>
        <Grid.Col sm={7} span={14}>
          <Card type="calendar" />
        </Grid.Col>
        <Grid.Col sm={3} span={14}>
          <Card type="upcomingEvents" />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default HomePage;
