import React from "react";
import { Grid, Skeleton } from "@mantine/core";

type Props = {};

const MediaPageLoading = (props: Props) => {
  return (
    <Grid gutter={10} className="m-10">
      <Grid.Col xs={6} sm={4} md={3}>
        <Skeleton height={300} width="100%" radius="lg" />
      </Grid.Col>
      <Grid.Col xs={6} sm={4} md={3}>
        <Skeleton height={300} width="100%" radius="lg" />
      </Grid.Col>
      <Grid.Col xs={6} sm={4} md={3}>
        <Skeleton height={300} width="100%" radius="lg" />
      </Grid.Col>
      <Grid.Col xs={6} sm={4} md={3}>
        <Skeleton height={300} width="100%" radius="lg" />
      </Grid.Col>
      <Grid.Col xs={6} sm={4} md={3}>
        <Skeleton height={300} width="100%" radius="lg" />
      </Grid.Col>
      <Grid.Col xs={6} sm={4} md={3}>
        <Skeleton height={300} width="100%" radius="lg" />
      </Grid.Col>
      <Grid.Col xs={6} sm={4} md={3}>
        <Skeleton height={300} width="100%" radius="lg" />
      </Grid.Col>
    </Grid>
  );
};

export default MediaPageLoading;
