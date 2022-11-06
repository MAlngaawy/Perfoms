import React, { useState } from "react";
import "./styles.css";
import { Grid } from "@mantine/core";
import Card from "~/@main/components/Card";
import { playerData } from "../home/HomePage";
import SecondNav from "../home/organisms/SecondNav";
import { players } from "../home/HomePage";
import { Dropdown } from "~/@main/components/Dropdown";
import AppIcons from "~/@main/core/AppIcons";

// ===== dummy data =====

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

const scores = [
  {
    name: "kick",
    score: "2",
  },
  {
    name: "kick",
    score: "2",
  },
  {
    name: "kick",
    score: "2",
  },
  {
    name: "kick",
    score: "2",
  },
  {
    name: "kick",
    score: "2",
  },
  {
    name: "kick",
    score: "2",
  },
];

const text = {
  firstText: "Name of the metric “ left leg” ",
  secondText: "Name of the action “ need more practicing” ",
  detailedText:
    "10 Exercises to Improve Your Flexibility 1. Standing Quad Stretch. Stand with your feet together. ... 2. Standing Side Stretch. Standing with your feet together, lift your arms overhead. ... 3. Seated Hamstring Stretch. ... 4.",
};
// ==============

const ReportPage = () => {
  const [selectedplayer, setSelectedPlayer] = useState<any>(null);

  return (
    <div className="report-page px-5 mb-20">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <SecondNav
          players={players}
          selectedplayer={selectedplayer}
          setSelectedPlayer={setSelectedPlayer}
        />
        <div className="flex flex-col md:flex-row gap-3 justify-center items-center pt-3 md:pt-0">
          <Dropdown
            label="Performance"
            styleType="primary"
            listItems={["Performance", "Attendance", "Matches"]}
          />
          <button className="text-perfBlue shadow-md border-perfBlue border-2 border-perfBlue rounded-full py-3 px-10 h-12 flex flex-row justify-center items-center gap-1">
            <AppIcons className="w-5" icon="PrinterIcon:outline" /> Exports
          </button>
          <Dropdown label="This week" listItems={[]} />
        </div>
      </div>
      <Grid columns={12} gutter={20}>
        <Grid.Col sm={3} span={12}>
          <Card type="playerInfo" playerData={playerData} />
        </Grid.Col>
        <Grid.Col sm={9} span={12}>
          <Card type="performanceSummary" playerSummary={playerSummary} />
        </Grid.Col>
      </Grid>
      <Grid columns={12} gutter={20} className="info mt-3">
        <Grid.Col sm={4} span={12}>
          <Card
            type="power"
            color="text-[#27AE60]"
            bg="bg-fadedGreen"
            powerType="Strength"
            scores={scores}
          />
        </Grid.Col>
        <Grid.Col sm={4} span={12}>
          <Card
            type="power"
            color="text-[#F2C94C]"
            bg="bg-fadedYellow"
            powerType="Strength"
            scores={scores}
          />
        </Grid.Col>
        <Grid.Col sm={4} span={12}>
          <Card
            type="power"
            color="text-[#EB5757]"
            bg="bg-fadedRed"
            powerType="Strength"
            scores={scores}
          />
        </Grid.Col>
      </Grid>
      <Grid columns={12} gutter={20} className="info mt-3">
        <Grid.Col sm={6} span={12}>
          <Card
            type="action"
            header="Actions"
            firstText={text.firstText}
            secondText={text.secondText}
            detailedText={text.detailedText}
          />
        </Grid.Col>
        <Grid.Col sm={6} span={12}>
          <Card
            type="recommendation"
            header="Recommendations"
            firstText={text.firstText}
            secondText={text.secondText}
            detailedText={text.detailedText}
          />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default ReportPage;
