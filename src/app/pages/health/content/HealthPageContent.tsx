import HomePlayerInfoCard from "../../../../@main/components/HomePlayerInfoCard";
import HealthProgressBar from "~/@main/components/Health/HealthProgressBar";
import HealthReportSummary from "~/@main/components/Health/HealthReportSummary";
import HealthActivityProgressBars from "~/@main/components/Health/HealthActivityProgressBars";
import HealthSteps from "~/@main/components/Health/HealthSteps";
import HealthCalories from "~/@main/components/Health/HealthCalories";
import HealthSleep from "~/@main/components/Health/HealthSleep";
import { Grid } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectedPlayerFn } from "~/app/store/parent/parentSlice";
import { Player } from "~/app/store/types/parent-types";
import { useUserQuery } from "~/app/store/user/userApi";

type Props = {};

const HealthPageContent = (props: Props) => {
  const { id: player_id } = useParams();
 
  return (
    <div className="flex flex-col gap-4">
      <Grid columns={15} gutter={"md"}>
        <Grid.Col md={5} lg={4} xl={2.5} span={15}>
          <div className="flex flex-col gap-4">
            <HomePlayerInfoCard player_id={player_id} />
            <div className="note bg-white rounded-3xl w-full p-4 h-full">
              <h2 className="text-lg font-normal text-perfGray1 pb-4">
                Overall notes
              </h2>
              <p className=" text-base font-normal text-perfGray3">
                Fitness Flexibility 10 Exercises to Improve Your Flexibility 1.
                Standing Quad Stretch. Stand with your feet together. ... 2.
                Standing Side Stretch. Standing with your feet together, lift
                your arms overhead. ... 3. Seated Hamstring Stretch. ... 4.
                Standing Calf Stretch. ... 5. Shoulder Stretch. ... 6. The
                Forward Hang. ... 7. Back stretch. ... 8. Butterfly Groin
                Stretch.
              </p>
            </div>
          </div>
        </Grid.Col>
        <Grid.Col md={10} lg={11} xl={12.5} span={15}>
          <Grid columns={15} gutter={"md"}>
            {/* progress bar in top */}
            <Grid.Col
              span={15}
              className="relative min-h-[60px] h-[140px]  sm:h-20 sm:max-h-[100px]"
            >
              <HealthProgressBar  />
            </Grid.Col>
            <Grid.Col sm={7.5} xl={5} orderXl={1} order={1} span={15}>
              <HealthSteps  />
            </Grid.Col>
            <Grid.Col sm={7.5} xl={4} orderXl={1} order={1} span={15}>
              <HealthCalories  />
            </Grid.Col>
            <Grid.Col sm={7.5} xl={6} orderXl={1} order={1} span={15}>
              <HealthSleep  />
            </Grid.Col>
            <Grid.Col xl={9} orderXl={1} order={2} span={15}>
              <HealthActivityProgressBars  />
            </Grid.Col>
            <Grid.Col sm={7.5} xl={6} orderXl={1} order={1} span={15}>
              <HealthReportSummary  />
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default HealthPageContent;
