import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Grid } from "@mantine/core";
import CoachExperince from "~/@main/components/CoachExperince";

export default {
  title: "Cards/Coah Experinces",
  component: CoachExperince,
} as ComponentMeta<typeof CoachExperince>;

const Template: ComponentStory<typeof CoachExperince> = (args) => (
  <Grid className=" bg-slate-300">
    <Grid.Col className="mx-auto" xs={12} md={7}>
      <CoachExperince {...args} />
    </Grid.Col>
  </Grid>
);

export const Primary = Template.bind({});

Primary.args = {};
