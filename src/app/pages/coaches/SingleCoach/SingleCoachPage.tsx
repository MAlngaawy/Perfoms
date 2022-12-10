import React, { useEffect, useState } from "react";
import { Grid } from "@mantine/core";

import CoachPersonalInfo from "~/@main/components/CoachPersonalInfo";
import CoachExperince from "~/@main/components/CoachExperince";
import CoachAchievements from "~/@main/components/CoachAchievements";
import CustomBreadCrumbs from "~/@main/components/BreadCrumbs";
import { usePlayerCoachQuery } from "~/app/store/parent/parentApi";
import { useUserQuery } from "~/app/store/user/userApi";
import { PlayerCoach } from "~/app/store/types/parent-types";
import { User } from "~/app/store/types/user-types";
import { useParams } from "react-router-dom";
import __ from "lodash";

type Props = {};

const coachAchev = [
  {
    type: "Gold medal",
    year: 2015,
    place: "olymbec games",
  },
  {
    type: "Gold medal",
    year: 2015,
    place: "olymbec games",
  },
  {
    type: "Gold medal",
    year: 2015,
    place: "olymbec games",
  },
  {
    type: "Gold medal",
    year: 2015,
    place: "olymbec games",
  },
  {
    type: "Gold medal",
    year: 2015,
    place: "olymbec games",
  },
];

const coachExp = {
  experinces: [
    {
      start: "10/10/2020",
      end: "10/10/2022",
      title: "Martial Arts Instructor ",
      works: [
        "Voluptatibus sequi deserunt id.",
        "quaerat optio ullam atque aut eligendi ea commodi?",
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
        "Eaque aspernatur suscipit fuga perferendis numquam quisquam non nesciunt error,",
      ],
    },
    {
      start: "10/10/2020",
      end: "10/10/2022",
      title: "Martial Arts Instructor ",
      works: [
        "Voluptatibus sequi deserunt id.",
        "quaerat optio ullam atque aut eligendi ea commodi?",
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
        "Eaque aspernatur suscipit fuga perferendis numquam quisquam non nesciunt error,",
      ],
    },
  ],
  qualifications: [
    "Voluptatibus sequi deserunt id.",
    "quaerat optio ullam atque aut eligendi ea commodi?",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    "Eaque aspernatur suscipit fuga perferendis numquam quisquam non nesciunt error,",
  ],
  courses: [
    "Voluptatibus sequi deserunt id.",
    "quaerat optio ullam atque aut eligendi ea commodi?",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    "Eaque aspernatur suscipit fuga perferendis numquam quisquam non nesciunt error,",
  ],
};

const SingleCoachPage = (props: Props) => {
  const [data, setData] = useState<User | PlayerCoach>();

  const { id } = useParams();

  const { data: coachData } = usePlayerCoachQuery(
    { id: (id !== undefined && +id) || 0 },
    { skip: __.isNil(id) }
  );

  // useEffect(() => {
  //   if (user?.user_type === "Parent") {
  //     /// Set THe Data Based on the user type
  //     setData(coachData);
  //   } else {
  //     setData(user);
  //   }
  // }, [user, coachData]);

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
