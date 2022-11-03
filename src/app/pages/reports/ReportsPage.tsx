import React from "react";
import "./styles.css";
import { Grid } from '@mantine/core';
import Card from '@main/components/Card'
import FirstNav from "@main/components/FirstNav";

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
    name:'kick',
    score:'2'
  },
  {
    name:'kick',
    score:'2'
  },
  {
    name:'kick',
    score:'2'
  },
  {
    name:'kick',
    score:'2'
  },
  {
    name:'kick',
    score:'2'
  },
  {
    name:'kick',
    score:'2'
  },
]

const text = {
  firstText:'Name of the metric “ left leg” ',
  secondText: 'Name of the action “ need more practicing” ',
  detailedText: '10 Exercises to Improve Your Flexibility 1. Standing Quad Stretch. Stand with your feet together. ... 2. Standing Side Stretch. Standing with your feet together, lift your arms overhead. ... 3. Seated Hamstring Stretch. ... 4.'
}
// ==============


const ReportPage = () => {
  return (
    <div className="report-page bg-black px-5 mb-20">
      <FirstNav pageName="Report" />
      <Grid columns={12} gutter={20}>
              <Grid.Col span={3}>
                <Card type='playerInfo' />
              </Grid.Col>
              <Grid.Col span={9}>
                <Card type='performanceSummary' playerSummary={playerSummary} />
              </Grid.Col>
            </Grid>
            <Grid  columns={12} gutter={20} className="info mt-3">
              <Grid.Col span={4}>
                <Card type='power' powerType="Strength" scores={scores} />
              </Grid.Col>
              <Grid.Col span={4}>
                <Card type='power' powerType="Strength" scores={scores} />
              </Grid.Col>
              <Grid.Col span={4}>
                <Card type='power' powerType="Strength" scores={scores} />
              </Grid.Col>
            </Grid>
            <Grid  columns={12} gutter={20} className="info mt-3">
              <Grid.Col span={6}>
                <Card type='action' firstText={text.firstText} secondText={text.secondText} detailedText={text.detailedText} />
              </Grid.Col>
              <Grid.Col span={6}>
                <Card type='recommendation' firstText={text.firstText} secondText={text.secondText} detailedText={text.detailedText} />
              </Grid.Col>
            </Grid>
    </div>
  );
};

export default ReportPage;
