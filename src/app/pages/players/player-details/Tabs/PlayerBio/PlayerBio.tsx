import { Grid } from "@mantine/core";
import React from "react";
import Achievements from "./Components/Achievements/Achievements";
import Experiences from "./Components/Experiences/Experiences";
import PersonalInfo from "./Components/PersonalInfo/ParsonalInfo";

type Props = {};

const PlayerBio = (props: Props) => {
  return (
    <div className="">
      <Grid className="" gutter="sm">
        <Grid.Col xs={12} md={3}>
          <PersonalInfo />
        </Grid.Col>
        <Grid.Col xs={12} md={7}>
          <Experiences />
        </Grid.Col>
        <Grid.Col xs={12} md={2}>
          <Achievements />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default PlayerBio;
