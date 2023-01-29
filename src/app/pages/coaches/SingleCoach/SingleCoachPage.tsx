import React, { useEffect, useState } from "react";
import { Grid } from "@mantine/core";

import CoachPersonalInfo from "~/@main/components/CoachProfileComponents/CoachPersonalInfo";
import CoachExperince from "~/@main/components/CoachProfileComponents/CoachExperince";
import CoachAchievements from "~/@main/components/CoachProfileComponents/CoachAchievements";
import CustomBreadCrumbs from "~/@main/components/BreadCrumbs";
import { usePlayerCoachQuery } from "~/app/store/parent/parentApi";
import { useUserQuery } from "~/app/store/user/userApi";
import { PlayerCoach } from "~/app/store/types/parent-types";
import { User } from "~/app/store/types/user-types";
import { useParams } from "react-router-dom";
import __ from "lodash";

const SingleCoachPage = () => {
  const [data, setData] = useState<User | PlayerCoach>();

  const { coach_id } = useParams();

  const { data: coachData } = usePlayerCoachQuery(
    { id: (coach_id !== undefined && +coach_id) || 0 },
    { skip: __.isNil(coach_id) }
  );

  console.log(coachData);

  return (
    <div className=" container mx-auto">
      <CustomBreadCrumbs items={[{ title: "coaches", href: "/coaches" }]} />
      <Grid className="p-1 m-2" gutter="sm">
        <Grid.Col xs={12} md={3}>
          <CoachPersonalInfo type={"cv"} data={coachData} />
        </Grid.Col>
        <Grid.Col xs={12} md={7}>
          <CoachExperince data={coachData} />
        </Grid.Col>
        <Grid.Col xs={12} md={2}>
          <CoachAchievements data={coachData?.details} />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default SingleCoachPage;
