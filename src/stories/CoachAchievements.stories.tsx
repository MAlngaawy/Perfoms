import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Grid } from "@mantine/core";
import CoachAchievements from "~/@main/components/CoachAchievements";

export default {
  title: "Cards/Coah Achievements",
  component: CoachAchievements,
} as ComponentMeta<typeof CoachAchievements>;

const Template: ComponentStory<typeof CoachAchievements> = (args) => (
  <Grid className=" bg-slate-300">
    <Grid.Col className="mx-auto" xs={12} md={2}>
      <CoachAchievements {...args} />
    </Grid.Col>
  </Grid>
);

export const Primary = Template.bind({});

Primary.args = {
  data: [
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
  ],
};
