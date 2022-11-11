import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CoachCard from "../app/pages/coaches/components/CoachCard";
import { Grid } from "@mantine/core";

export default {
  title: "Cards/Coah Card",
  component: CoachCard,
} as ComponentMeta<typeof CoachCard>;

const Template: ComponentStory<typeof CoachCard> = (args) => (
  <Grid className=" bg-slate-300">
    <Grid.Col className="mx-auto" span={3}>
      <CoachCard {...args} />
    </Grid.Col>
  </Grid>
);

export const Primary = Template.bind({});

Primary.args = {
  id: 1,
  role: "Coach",
  name: "Mohammed Ali",
  education: "Bachelor of Physical Education",
  photo:
    "https://st.depositphotos.com/1008939/1880/i/950/depositphotos_18807295-stock-photo-portrait-of-handsome-man.jpg",
  sport: "Taekwondo",
};

export const WithoutPhoto = Template.bind({});
WithoutPhoto.args = {
  id: 2,
  role: "Coach",
  name: "Mohammed Ali",
  education: "Bachelor of Physical Education",
  sport: "Taekwondo",
};
