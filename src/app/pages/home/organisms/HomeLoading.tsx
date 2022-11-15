import React from "react";
import { Grid, Skeleton } from "@mantine/core";

type Props = {};

const HomeLoading = (props: Props) => {
  return (
    <div className="">
      <Grid columns={12} gutter={"sm"}>
        <Grid.Col sm={3} span={12}>
          <Skeleton height={300} width="100%" radius="lg" />
        </Grid.Col>
        <Grid.Col sm={9} span={12}>
          <Skeleton height={300} width="100%" radius="lg" />
        </Grid.Col>
      </Grid>
      <Grid columns={14} gutter={"sm"} className="info mt-3">
        <Grid.Col sm={4} span={14}>
          <Skeleton height={300} width="100%" radius="lg" />
        </Grid.Col>
        <Grid.Col sm={7} span={14}>
          <Skeleton height={300} width="100%" radius="lg" />
        </Grid.Col>
        <Grid.Col sm={3} span={14}>
          <Skeleton height={300} width="100%" radius="lg" />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default HomeLoading;
