import React from "react";
import { Grid } from "@mantine/core";

import CoachPersonalInfo from "~/@main/components/CoachPersonalInfo";
import CoachExperince from "~/@main/components/CoachExperince";
import CoachAchievements from "~/@main/components/CoachAchievements";
import CustomBreadCrumbs from "~/@main/components/BreadCrumbs";

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
  return (
    <div className=" container mx-auto">
      <CustomBreadCrumbs items={[{ title: "coaches", href: "/coaches" }]} />
      <Grid className="p-1 m-2" gutter="sm">
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
        <Grid.Col xs={12} md={7}>
          <CoachExperince {...coachExp} />
        </Grid.Col>
        <Grid.Col xs={12} md={2}>
          <CoachAchievements data={coachAchev} />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default SingleCoachPage;
