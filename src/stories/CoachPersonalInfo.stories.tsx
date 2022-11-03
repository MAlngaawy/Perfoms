import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Grid } from "@mantine/core";
import CoachPersonalInfo from "../app/pages/coaches/SingleCoach/components/CoachPersonalInfo";

export default {
  title: "Cards/Coah Info",
  component: CoachPersonalInfo,
} as ComponentMeta<typeof CoachPersonalInfo>;

const Template: ComponentStory<typeof CoachPersonalInfo> = (args) => (
  <Grid className=" bg-slate-300">
    <Grid.Col className="mx-auto" xs={12} md={3}>
      <CoachPersonalInfo {...args} />
    </Grid.Col>
  </Grid>
);

export const Primary = Template.bind({});

Primary.args = {
  id: 1,
  role: "Coach",
  name: "Mohammed Ali",
  teams: ["Team 1", "Team 2", "Team 3", "Team 1", "Team 2", "Team 3"],
  photo:
    "https://st.depositphotos.com/1008939/1880/i/950/depositphotos_18807295-stock-photo-portrait-of-handsome-man.jpg",
  sport: "Taekwondo",
  bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic dolorum nihil sunt cum tempore numquam, alias laboriosam similique eaque perferendis temporibus repellat? Delectus deserunt aspernatur saepe voluptas ad. Deserunt, excepturi!",
  education: [
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
  ],
};

export const WithoutPhoto = Template.bind({});
WithoutPhoto.args = {
  id: 1,
  role: "Coach",
  name: "Mohammed Ali",
  teams: ["Team 1", "Team 2", "Team 3", "Team 1", "Team 2", "Team 3"],
  sport: "Taekwondo",
  bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic dolorum nihil sunt cum tempore numquam, alias laboriosam similique eaque perferendis temporibus repellat? Delectus deserunt aspernatur saepe voluptas ad. Deserunt, excepturi!",
  education: [
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
  ],
};

// export const WithoutPhoto = Template.bind({});
// WithoutPhoto.args = {
//   id: 2,
//   role: "Coach",
//   name: "Mohammed Ali",
//   education: "Bachelor of Physical Education",
//   teams: ["Team 1", "Team 2", "Team 3"],
//   sport: "Taekwondo",
// };
