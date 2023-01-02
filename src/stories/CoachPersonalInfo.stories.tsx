import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Grid } from "@mantine/core";
import CoachPersonalInfo from "~/@main/components/CoachProfileComponents/CoachPersonalInfo";

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

Primary.args = {};

export const WithoutPhoto = Template.bind({});
WithoutPhoto.args = {};
