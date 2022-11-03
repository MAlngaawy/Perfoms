import HomeFirstNav from "./organisms/HomeFirstNav";
import React from "react";
import { Grid } from '@mantine/core';
import Card from '@main/components/Card'

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

const HomePage = () => {
return  (
          <div className="home-page bg-black px-5 mb-20">
            <HomeFirstNav userName='User' />
            {/* second nav  */}
            <Grid columns={12} gutter={20}>
              <Grid.Col span={3}>
                <Card type='playerInfo' />
              </Grid.Col>
              <Grid.Col span={9}>
                <Card type='performanceSummary' playerSummary={playerSummary} />
              </Grid.Col>
            </Grid>
            <Grid  columns={15} gutter={20} className="info mt-3 h-96">
              <Grid.Col span={5}>
                <Card type='teamInfo' />
              </Grid.Col>
              <Grid.Col span={7}>
                <Card type='calendar' />
              </Grid.Col>
              <Grid.Col span={3}>
                <Card type='upcomingEvents' />
              </Grid.Col>
            </Grid>
          </div>
        )
};

export default HomePage;
