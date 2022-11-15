import { Grid } from "@mantine/core";
import React from "react";
import TeamCalendar from "./Components/TeamCalendar";

type Props = {};

const SingleTeam = (props: Props) => {
  return (
    <div className="py-6 px-2">
      <Grid gutter={"xs"}>
        <Grid.Col span={12} sm={7} lg={4}>
          <CardDiv>
            <TeamCalendar teamId={1} />
          </CardDiv>
        </Grid.Col>
        <Grid.Col span={12} sm={5} lg={3}>
          <CardDiv>Coaches</CardDiv>
        </Grid.Col>
        <Grid.Col span={12} sm={7} lg={3}>
          <CardDiv>Events</CardDiv>
        </Grid.Col>
        <Grid.Col span={12} sm={6} lg={2}>
          <CardDiv>Info</CardDiv>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default SingleTeam;

const CardDiv = ({ children }: any) => {
  return <div className="bg-white p-4 rounded-3xl">{children}</div>;
};
