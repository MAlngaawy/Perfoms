import React from "react";
import { Grid } from "@mantine/core";

import CoachPersonalInfo from "./components/CoachPersonalInfo";

type Props = {};

const SingleCoachPage = (props: Props) => {
  return (
    <Grid className="p-10" gutter="xl">
      <Grid.Col xs={12} md={3}>
        <CoachPersonalInfo />
      </Grid.Col>
      <Grid.Col xs={12} md={7}>
        <CoachPersonalInfo />
      </Grid.Col>
      <Grid.Col xs={12} md={2}>
        <CoachPersonalInfo />
      </Grid.Col>
    </Grid>
  );
};

export default SingleCoachPage;
