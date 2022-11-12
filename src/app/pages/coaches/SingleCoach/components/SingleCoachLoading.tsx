import React from "react";
import { Grid, Skeleton } from "@mantine/core";

type Props = {};

const SingleCoachLoading = (props: Props) => {
  return (
    <Grid className="p-4" gutter="sm">
      <Grid.Col xs={12} md={3}>
        <Skeleton height={"100vh"} width="100%" radius="lg" />
      </Grid.Col>
      <Grid.Col xs={12} md={7}>
        <Skeleton height={"100vh"} width="100%" radius="lg" />
      </Grid.Col>
      <Grid.Col xs={12} md={2}>
        <Skeleton height={"100vh"} width="100%" radius="lg" />
      </Grid.Col>
    </Grid>
  );
};

export default SingleCoachLoading;
