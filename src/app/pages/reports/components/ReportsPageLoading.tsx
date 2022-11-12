import React from "react";
import { Grid, Skeleton } from "@mantine/core";

type Props = {
  type: "Performances" | "Attendances";
};

const ReportsPageLoading = ({ type }: Props) => {
  return (
    <div>
      {type === "Performances" ? (
        <div>
          <Grid columns={12} gutter={"sm"}>
            <Grid.Col sm={3} span={12}>
              <Skeleton height={300} width="100%" radius="lg" />
            </Grid.Col>
            <Grid.Col sm={9} span={12}>
              <Skeleton height={300} width="100%" radius="lg" />
            </Grid.Col>
          </Grid>
          <Grid columns={12} gutter={"sm"} className="info mt-3">
            <Grid.Col sm={4} span={12}>
              <Skeleton height={300} width="100%" radius="lg" />
            </Grid.Col>
            <Grid.Col sm={4} span={12}>
              <Skeleton height={300} width="100%" radius="lg" />
            </Grid.Col>
            <Grid.Col sm={4} span={12}>
              <Skeleton height={300} width="100%" radius="lg" />
            </Grid.Col>
          </Grid>
          <Grid columns={12} gutter={"sm"} className="info mt-3">
            <Grid.Col sm={6} span={12}>
              <Skeleton height={300} width="100%" radius="lg" />
            </Grid.Col>
            <Grid.Col sm={6} span={12}>
              <Skeleton height={300} width="100%" radius="lg" />
            </Grid.Col>
          </Grid>{" "}
        </div>
      ) : (
        <div className="attendances">
          {/* Left Columns ( User Info And Note ) */}
          <Grid gutter={"sm"}>
            <Grid.Col span={12} sm={3}>
              <div className="flex flex-col gap-2">
                <Skeleton height={350} width="100%" radius="lg" />
                <Skeleton height={350} width="100%" radius="lg" />
              </div>
            </Grid.Col>

            {/* Right Column Attendance Charts And numbers */}
            <Grid.Col span={12} sm={9}>
              <Grid gutter={"sm"}>
                <Grid.Col span={12}>
                  <Skeleton height={100} width="100%" radius="lg" />
                </Grid.Col>
                {/* Attedance Summary Table */}
                <Grid.Col span={12} sm={8}>
                  <Skeleton height={600} width="100%" radius="lg" />
                </Grid.Col>

                <Grid.Col span={12} sm={4}>
                  <div className="flex flex-col gap-4">
                    {/* Total Attendace Pie Chart  */}
                    <Skeleton height={300} width="100%" radius="lg" />

                    {/* Attendance Calender */}
                    <Skeleton height={300} width="100%" radius="lg" />
                  </div>
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default ReportsPageLoading;
