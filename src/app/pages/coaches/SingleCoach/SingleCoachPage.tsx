import React from "react";
import { Grid } from "@mantine/core";

import CoachPersonalInfo from "./components/CoachPersonalInfo";

type Props = {};

const SingleCoachPage = (props: Props) => {
  return (
    <Grid className="p-10" gutter="xl">
      <Grid.Col xs={12} md={3}>
        <CoachPersonalInfo
          id={1}
          role="Coach"
          name="Mohammed Ali"
          teams={["Team 1", "Team 2", "Team 3", "Team 1", "Team 2", "Team 3"]}
          sport="Taekwondo"
          bio="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic dolorum nihil sunt cum tempore numquam, alias laboriosam similique eaque perferendis temporibus repellat? Delectus deserunt aspernatur saepe voluptas ad. Deserunt, excepturi!"
          education={[
            {
              from: "10/11/2022",
              to: "11/11/2025",
              degree: "Bachelor of Physical Education",
              universty: "Universty of cairo",
            },
            {
              from: "10/11/2022",
              to: "11/11/2025",
              degree: "Bachelor of Physical Education",
              universty: "Universty of cairo",
            },
          ]}
        />
      </Grid.Col>
      <Grid.Col xs={12} md={7}></Grid.Col>
      <Grid.Col xs={12} md={2}></Grid.Col>
    </Grid>
  );
};

export default SingleCoachPage;
